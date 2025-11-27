import { spawnSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

/**
 * Detecta si Forge está instalado y retorna su versión y estado
 * Estados posibles:
 * - "exact": Versión exacta 1.20.1-forge-47.4.12
 * - "acceptable": Cualquier 1.20.1-forge-x.x.x (pero no la exacta)
 * - "notInstalled": No hay ninguna versión de Forge
 * @returns {Promise<{status: string, version: string | null, forgePath: string | null, allVersions: array}>}
 */
export async function checkForgeVersion() {
  const RECOMMENDED_VERSION = '1.20.1-forge-47.4.12'
  const REQUIRED_MINECRAFT_VERSION = '1.20.1'

  try {
    // console.log('Checking Forge...')

    // Determinar la ruta base de .minecraft según el SO
    let minecraftBaseDir = null
    if (process.platform === 'win32') {
      minecraftBaseDir = join(process.env.APPDATA || '', '.minecraft')
    } else if (process.platform === 'darwin') {
      // macOS
      minecraftBaseDir = join(process.env.HOME || '', 'Library/Application Support/minecraft')
    } else if (process.platform === 'linux') {
      // Linux
      minecraftBaseDir = join(process.env.HOME || '', '.minecraft')
    }

    if (!minecraftBaseDir || !existsSync(minecraftBaseDir)) {
      // console.log('Minecraft directory not found:', minecraftBaseDir)
      return { status: 'notInstalled', version: null, forgePath: null, allVersions: [] }
    }

    // Buscar directorio de versiones de Forge
    const versionsDir = join(minecraftBaseDir, 'versions')
    if (!existsSync(versionsDir)) {
      // console.log('Versions directory not found')
      return { status: 'notInstalled', version: null, forgePath: null, allVersions: [] }
    }

    // Leer directorios que contengan "forge"
    const fs = require('fs')
    const dirs = fs.readdirSync(versionsDir)
    const forgeDirs = dirs.filter((dir) => dir.toLowerCase().includes('forge'))

    if (forgeDirs.length === 0) {
      // console.log('No Forge installations found')
      return { status: 'notInstalled', version: null, forgePath: null, allVersions: [] }
    }

    // Buscar versión exacta recomendada
    if (forgeDirs.includes(RECOMMENDED_VERSION)) {
      const forgeDir = join(versionsDir, RECOMMENDED_VERSION)
      // console.log('Forge EXACT version found:', RECOMMENDED_VERSION, 'at', forgeDir)
      return {
        status: 'exact',
        version: RECOMMENDED_VERSION,
        forgePath: forgeDir,
        allVersions: forgeDirs
      }
    }

    // Buscar cualquier versión aceptable (1.20.1-forge-x.x.x)
    const acceptableVersions = forgeDirs.filter((dir) =>
      dir.startsWith(`${REQUIRED_MINECRAFT_VERSION}-forge-`)
    )

    if (acceptableVersions.length > 0) {
      // Tomar la más reciente alfabéticamente
      const latestAcceptableVersion = acceptableVersions.sort().pop()
      const forgeDir = join(versionsDir, latestAcceptableVersion)
      // console.log('Forge ACCEPTABLE version found:', latestAcceptableVersion, 'at', forgeDir)
      return {
        status: 'acceptable',
        version: latestAcceptableVersion,
        forgePath: forgeDir,
        allVersions: forgeDirs
      }
    }

    // Si hay versiones de Forge pero no son las correctas
    // console.log('No compatible Forge version found. Available:', forgeDirs)
    return {
      status: 'notInstalled',
      version: null,
      forgePath: null,
      allVersions: forgeDirs
    }
  } catch (error) {
    console.error('Error checking Forge:', error)
    return { status: 'notInstalled', version: null, forgePath: null, allVersions: [] }
  }
}

/**
 * Verifica si la versión de Forge es compatible con la versión de Minecraft requerida
 * @param {string} version - Versión de Forge (ej: "1.20.1-47.2.0")
 * @param {string} minecraftVersion - Versión mínima de Minecraft requerida (ej: "1.20.1")
 * @returns {boolean}
 */
export function isForgeVersionCompatible(status) {
  // Solo aceptar estado "exact" o "acceptable"
  return status === 'exact' || status === 'acceptable'
}
