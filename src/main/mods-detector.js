import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import crypto from 'crypto'
import { RECOMMENDED_MODS, getRecommendedMods } from '../config'
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
 * Extrae una versión desde el nombre de archivo, por ejemplo
 * 'melody_forge_1.0.3_MC_1.20.1-1.20.4.jar' => '1.0.3'
 */
function extractVersionFromFilename(filename) {
  // Eliminar la extensión
  const nameWithoutExt = filename.replace(/\.(jar|zip)$/i, '')

  // Patrón 1: Buscar versión explícita después de _MC_ o -MC- (versión de Minecraft)
  // Ejemplo: fancymenu_forge_3.8.1_MC_1.20.1.jar
  const mcPattern = /^(.+?)[-_](\d+\.\d+(?:\.\d+)?(?:\.\d+)?)[-_](?:MC|mc)[-_]/i
  const mcMatch = nameWithoutExt.match(mcPattern)
  if (mcMatch) {
    return mcMatch[2] // La versión del mod está antes de _MC_
  }

  // Patrón 2: Cuando empieza con versión de MC (1.20.x), buscar la siguiente versión más larga
  // Ejemplo: jei-1.20.1-forge-15.20.0.125.jar
  const mcFirstPattern = /^.*?-?(1\.\d{1,2}(?:\.\d+)?)-.*?-(\d+\.\d+\.\d+(?:\.\d+)?)/
  const mcFirstMatch = nameWithoutExt.match(mcFirstPattern)
  if (mcFirstMatch) {
    const minecraftVer = mcFirstMatch[1]
    const modVer = mcFirstMatch[2]

    // Si la segunda versión tiene más componentes, probablemente es la del mod
    const mcParts = minecraftVer.split('.').length
    const modParts = modVer.split('.').length

    if (modParts > mcParts) {
      return modVer
    }
  }

  // Patrón 3: Buscar la versión más larga/compleja (más componentes)
  // Los mods suelen tener versiones más largas que Minecraft
  const allVersions = nameWithoutExt.match(/\d+\.\d+(?:\.\d+)?(?:\.\d+)?/g) || []

  if (allVersions.length > 0) {
    // Filtrar versiones que parecen ser de Minecraft (1.x.x o 1.xx.x)
    const nonMcVersions = allVersions.filter((v) => {
      // Si empieza con "1." y el siguiente número es menor a 21, probablemente es MC
      const match = v.match(/^1\.(\d+)/)
      if (match && parseInt(match[1]) <= 21) {
        return false // Es versión de Minecraft
      }
      return true
    })

    if (nonMcVersions.length > 0) {
      // Retornar la versión con más componentes (más específica)
      return nonMcVersions.sort((a, b) => {
        const aParts = a.split('.').length
        const bParts = b.split('.').length
        return bParts - aParts
      })[0]
    }

    // Si todas parecen ser de MC, tomar la última encontrada
    return allVersions[allVersions.length - 1]
  }

  return null
}

/**
 * Verifica mods instalados comparándolos con la lista recomendada
 * @param {Object} settings - Configuración de usuario {graphicsLevel, optionalMods}
 * @returns {Promise<{installed: Array, missing: Array, corrupted: Array, modified: Array}>}
 */
export async function checkMods(settings = {}) {
  try {
    console.log('Checking mods...', settings)

    // Obtener lista de mods recomendados según settings
    const MODS_TO_CHECK = getRecommendedMods(settings)
    const modsDir = getMinecraftPath('mods')
    const modBlacklist = settings.modBlacklist || []

    console.log('Checking directories. Mods base dir:', modsDir)
    const installed = []
    const missing = []
    const corrupted = []
    const modified = []
    const outdated = []
    const omitted = []

    // Verificar cada mod recomendado, teniendo en cuenta su tipo de instalación
    for (const recommendedMod of MODS_TO_CHECK) {
      // Si está en blacklist, lo marcamos como omitido y saltamos verificación
      if (modBlacklist.includes(recommendedMod.id)) {
        omitted.push(recommendedMod)
        console.log(`Mod omitted (blacklisted): ${recommendedMod.name}`)
        continue
      }

      const installType = recommendedMod.installType || 'mods'
      const targetDir = getPathForInstallType(installType)

      const extCheck =
        installType === 'shaderpack' || installType === 'resourcepack'
          ? (f) => f.endsWith('.zip')
          : (f) => f.endsWith('.jar')

      const modPath = join(targetDir, recommendedMod.filename)

      // Si carpeta objetivo no existe, consideramos que está faltante
      if (!existsSync(targetDir)) {
        missing.push(recommendedMod)
        console.log(`Target dir not found for ${recommendedMod.name}: ${targetDir}`)
        continue
      }

      const installedFiles = readdirSync(targetDir).filter((f) => extCheck(f))

      if (!existsSync(modPath)) {
        // Buscar variantes dentro del targetDir
        const baseKey = (recommendedMod.id || recommendedMod.filename || recommendedMod.name || '')
          .toString()
          .toLowerCase()
        const foundVariant = installedFiles.find((f) => f.toLowerCase().includes(baseKey))

        if (foundVariant) {
          const variantPath = join(targetDir, foundVariant)
          const fileSize = statSync(variantPath).size
          const fileHash = calculateFileHash(variantPath)
          const installedVersion = extractVersionFromFilename(foundVariant)

          const modInfo = {
            ...recommendedMod,
            installedFilename: foundVariant,
            installedHash: fileHash,
            fileSize,
            installedVersion,
            path: variantPath,
            installType
          }

          const expectedHash =
            recommendedMod.expectedHash || recommendedMod.hash || recommendedMod.expected || null

          if (expectedHash && fileHash && expectedHash !== fileHash) {
            corrupted.push({ ...modInfo, expectedHash })
            console.log(`Mod corrupted (variant): ${recommendedMod.name} (hash mismatch)`)
          } else if (
            recommendedMod.version &&
            installedVersion &&
            compareVersions(installedVersion, recommendedMod.version) < 0
          ) {
            outdated.push(modInfo)
            console.log(
              `Mod outdated: ${recommendedMod.name} (${installedVersion} < ${recommendedMod.version})`
            )
          } else {
            installed.push(modInfo)
            console.log(
              `Mod installed (variant): ${recommendedMod.name} -> ${foundVariant} (hash: ${fileHash?.substring(0, 8)}...)`
            )
          }
        } else {
          missing.push(recommendedMod)
          console.log(`Mod missing: ${recommendedMod.name} in ${targetDir}`)
        }
      } else {
        // Archivo exactamente como se espera
        const fileSize = statSync(modPath).size
        const fileHash = calculateFileHash(modPath)

        const modInfo = {
          ...recommendedMod,
          installedHash: fileHash,
          fileSize: fileSize,
          path: modPath,
          installType
        }

        const expectedHash =
          recommendedMod.expectedHash || recommendedMod.hash || recommendedMod.expected || null
        if (expectedHash && fileHash && expectedHash !== fileHash) {
          corrupted.push({ ...modInfo, expectedHash })
          console.log(`Mod corrupted: ${recommendedMod.name} (hash mismatch)`)
        } else {
          installed.push(modInfo)
          console.log(
            `Mod installed: ${recommendedMod.name} (hash: ${fileHash?.substring(0, 8)}...)`
          )
        }

        if (recommendedMod.version) {
          const installedVersion = extractVersionFromFilename(recommendedMod.filename)
          if (installedVersion && compareVersions(installedVersion, recommendedMod.version) < 0) {
            outdated.push({ ...modInfo, installedVersion })
            console.log(
              `Mod outdated (exact file): ${recommendedMod.name} (${installedVersion} < ${recommendedMod.version})`
            )
          }
        }
      }
    }

    return {
      installed,
      missing,
      corrupted,
      modified,
      outdated,
      omitted,
      modsDir,
      totalExpected: MODS_TO_CHECK.length,
      totalInstalled: installed.length,
      totalMissing: missing.length,
      totalOmitted: omitted.length
    }
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
