import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import crypto from 'crypto'
import {
  RECOMMENDED_MODS,
  OPTIONAL_MODS,
  GRAPHICS_LEVEL_MODS,
  AVAILABLE_SHADERS,
  SHADER_PRESETS
} from '../config'
import { getMinecraftPath, getPathForInstallType } from './utils/paths.js'

/**
 * Calcula hash SHA256 de un archivo
 */
function calculateFileHash(filePath) {
  try {
    const fileBuffer = readFileSync(filePath)
    return crypto.createHash('sha256').update(fileBuffer).digest('hex')
  } catch (e) {
    console.error(`Error calculating hash for ${filePath}:`, e.message)
    return null
  }
}

/**
 * Compara dos versiones semánticas simples como '1.2.3' -> -1,0,1
 */
function compareVersions(a, b) {
  if (!a && !b) return 0
  if (!a) return -1
  if (!b) return 1
  const pa = a
    .split(/[^0-9]+/)
    .filter(Boolean)
    .map((n) => parseInt(n, 10))
  const pb = b
    .split(/[^0-9]+/)
    .filter(Boolean)
    .map((n) => parseInt(n, 10))
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i++) {
    const na = pa[i] || 0
    const nb = pb[i] || 0
    if (na > nb) return 1
    if (na < nb) return -1
  }
  return 0
}

/**
 * Obtiene los mods recomendados basados en los settings
 */
function getRecommendedMods(settings = {}) {
  const { graphicsLevel = 'normal', optionalMods = {}, shaderPreset = 'high' } = settings

  let mods = [...RECOMMENDED_MODS]

  // Añadir mods opcionales si están habilitados
  Object.entries(optionalMods).forEach(([key, enabled]) => {
    if (enabled && OPTIONAL_MODS[key]) {
      mods = mods.concat(OPTIONAL_MODS[key])
    }
  })

  // Añadir shaders según preset si están habilitados
  if (optionalMods.shaders && SHADER_PRESETS[shaderPreset]) {
    const presetShaders = SHADER_PRESETS[shaderPreset].shaders
    presetShaders.forEach((shaderId) => {
      if (AVAILABLE_SHADERS[shaderId]) {
        mods.push(AVAILABLE_SHADERS[shaderId])
      }
    })
  }

  // Añadir mods según nivel gráfico
  if (GRAPHICS_LEVEL_MODS[graphicsLevel]) {
    mods = mods.concat(GRAPHICS_LEVEL_MODS[graphicsLevel])
  }

  // Remover duplicados por ID
  const seenIds = new Set()
  mods = mods.filter((mod) => {
    if (seenIds.has(mod.id)) return false
    seenIds.add(mod.id)
    return true
  })

  return mods
}

/**
 * Extrae una versión desde el nombre de archivo
 */
function extractVersionFromFilename(filename) {
  const nameWithoutExt = filename.replace(/\.(jar|zip)$/i, '')

  // Patrón 1: Buscar versión explícita después de _MC_ o -MC-
  const mcPattern = /^(.+?)[-_](\d+\.\d+(?:\.\d+)?(?:\.\d+)?)[-_](?:MC|mc)[-_]/i
  const mcMatch = nameWithoutExt.match(mcPattern)
  if (mcMatch) return mcMatch[2]

  // Patrón 2: Cuando empieza con versión de MC
  const mcFirstPattern = /^.*?-?(1\.\d{1,2}(?:\.\d+)?)-.*?-(\d+\.\d+\.\d+(?:\.\d+)?)/
  const mcFirstMatch = nameWithoutExt.match(mcFirstPattern)
  if (mcFirstMatch) {
    const minecraftVer = mcFirstMatch[1]
    const modVer = mcFirstMatch[2]
    if (modVer.split('.').length > minecraftVer.split('.').length) {
      return modVer
    }
  }

  // Patrón 3: Buscar la versión más larga/compleja
  const allVersions = nameWithoutExt.match(/\d+\.\d+(?:\.\d+)?(?:\.\d+)?/g) || []
  if (allVersions.length > 0) {
    const nonMcVersions = allVersions.filter((v) => {
      const match = v.match(/^1\.(\d+)/)
      return !(match && parseInt(match[1]) <= 21)
    })

    if (nonMcVersions.length > 0) {
      return nonMcVersions.sort((a, b) => b.split('.').length - a.split('.').length)[0]
    }
    return allVersions[allVersions.length - 1]
  }

  return null
}

function getInstallTypeExtension(installType) {
  return installType === 'shaderpack' || installType === 'resourcepack' ? '.zip' : '.jar'
}

function findInstalledVariant(targetDir, mod, installedFiles) {
  const baseKey = (mod.id || mod.filename || mod.name || '').toString().toLowerCase()
  return installedFiles.find((f) => f.toLowerCase().includes(baseKey))
}

function verifyMod(mod, targetDir, installedFiles) {
  const modPath = join(targetDir, mod.filename)
  let status = 'missing' // missing, installed, corrupted, outdated
  let details = {}

  if (existsSync(modPath)) {
    // Exact match found

    const fileSize = statSync(modPath).size
    const fileHash = calculateFileHash(modPath)
    const expectedHash = mod.expectedHash || mod.hash || mod.expected || null

    details = {
      installedFilename: mod.filename,
      installedHash: fileHash,
      fileSize,
      path: modPath
    }

    if (expectedHash && fileHash && expectedHash !== fileHash) {
      status = 'corrupted'
      details.expectedHash = expectedHash
    } else {
      status = 'installed'
      if (mod.version) {
        const installedVersion = extractVersionFromFilename(mod.filename)
        if (installedVersion && compareVersions(installedVersion, mod.version) < 0) {
          status = 'outdated'
          details.installedVersion = installedVersion
        }
      }
    }
  } else {
    // Check for variants
    const foundVariant = findInstalledVariant(targetDir, mod, installedFiles)
    if (foundVariant) {
      const variantPath = join(targetDir, foundVariant)
      const fileSize = statSync(variantPath).size
      const fileHash = calculateFileHash(variantPath)
      const installedVersion = extractVersionFromFilename(foundVariant)
      const expectedHash = mod.expectedHash || mod.hash || mod.expected || null

      details = {
        installedFilename: foundVariant,
        installedHash: fileHash,
        fileSize,
        installedVersion,
        path: variantPath
      }

      if (expectedHash && fileHash && expectedHash !== fileHash) {
        status = 'corrupted' // Variant found but hash mismatch (might be different version)
        details.expectedHash = expectedHash
      } else if (
        mod.version &&
        installedVersion &&
        compareVersions(installedVersion, mod.version) < 0
      ) {
        status = 'outdated'
      } else {
        status = 'installed' // Variant installed and seems okay
      }
    }
  }

  return { status, details }
}

function getUnusedMods(selectedMods) {
  let allKnownMods = [...RECOMMENDED_MODS]
  Object.values(OPTIONAL_MODS).forEach((list) => (allKnownMods = allKnownMods.concat(list)))
  Object.values(AVAILABLE_SHADERS).forEach((shader) => allKnownMods.push(shader))
  Object.values(GRAPHICS_LEVEL_MODS).forEach((list) => (allKnownMods = allKnownMods.concat(list)))

  // Filter duplicates
  const knownIds = new Set()
  allKnownMods = allKnownMods.filter((m) => {
    if (knownIds.has(m.id)) return false
    knownIds.add(m.id)
    return true
  })

  const selectedIds = new Set(selectedMods.map((m) => m.id))
  return allKnownMods.filter((m) => !selectedIds.has(m.id))
}

/**
 * Verifica mods instalados comparándolos con la lista recomendada
 */
export async function checkMods(settings = {}) {
  try {
    console.log('Checking mods...', settings)

    const MODS_TO_CHECK = getRecommendedMods(settings)
    const modsDir = getMinecraftPath('mods')
    const modBlacklist = settings.modBlacklist || []

    const result = {
      installed: [],
      missing: [],
      corrupted: [],
      modified: [],
      outdated: [],
      omitted: [],
      unused: [],
      modsDir,
      totalExpected: MODS_TO_CHECK.length
    }

    for (const mod of MODS_TO_CHECK) {
      if (modBlacklist.includes(mod.id)) {
        result.omitted.push(mod)
        continue
      }

      const installType = mod.installType || 'mods'
      const targetDir = getPathForInstallType(installType)

      if (!existsSync(targetDir)) {
        result.missing.push(mod)
        continue
      }

      const ext = getInstallTypeExtension(installType)
      const installedFiles = readdirSync(targetDir).filter((f) => f.endsWith(ext))

      const verification = verifyMod(mod, targetDir, installedFiles)
      const modInfo = { ...mod, ...verification.details, installType }

      switch (verification.status) {
        case 'installed':
          result.installed.push(modInfo)
          break
        case 'corrupted':
          result.corrupted.push(modInfo)
          break
        case 'outdated':
          result.outdated.push(modInfo)
          break
        case 'missing':
        default:
          result.missing.push(modInfo)
          break
      }
    }

    // Check for unused mods
    const unusedCandidates = getUnusedMods(MODS_TO_CHECK)
    for (const unusedMod of unusedCandidates) {
      const installType = unusedMod.installType || 'mods'
      const targetDir = getPathForInstallType(installType)
      if (!existsSync(targetDir)) continue

      const installedFiles = readdirSync(targetDir)
      const foundVariant = findInstalledVariant(targetDir, unusedMod, installedFiles)

      if (foundVariant) {
        // Double check it's not actually wanted (e.g. filename overlap)
        const isWanted = MODS_TO_CHECK.some(
          (wanted) =>
            wanted.filename === foundVariant ||
            (wanted.id && foundVariant.toLowerCase().includes(wanted.id.toLowerCase()))
        )

        if (!isWanted) {
          const variantPath = join(targetDir, foundVariant)
          if (!result.unused.some((u) => u.path === variantPath)) {
            result.unused.push({
              ...unusedMod,
              installedFilename: foundVariant,
              path: variantPath,
              installType,
              reason: 'disabled_in_settings'
            })
          }
        }
      }
    }

    result.totalInstalled = result.installed.length
    result.totalMissing = result.missing.length
    result.totalOmitted = result.omitted.length

    return result
  } catch (error) {
    console.error('Error checking mods:', error)
    return {
      installed: [],
      missing: [],
      corrupted: [],
      modified: [],
      outdated: [],
      omitted: [],
      modsDir: null
    }
  }
}

export { RECOMMENDED_MODS }
