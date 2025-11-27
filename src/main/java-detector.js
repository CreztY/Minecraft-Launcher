import { execSync, spawnSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

/**
 * Detecta si Java está instalado y retorna su versión
 * @returns {Promise<{installed: boolean, version: string | null, javaPath: string | null}>}
 */
export async function checkJavaVersion() {
  try {
    const proc = spawnSync('java', ['-version'], { encoding: 'utf-8' })
    const output = `${proc.stdout || ''}${proc.stderr || ''}`.trim()
    const versionMatch = output.match(/version "([^"]+)"/)

    if (versionMatch) {
      const version = versionMatch[1]
      let javaPath = null
      try {
        javaPath =
          process.platform === 'win32'
            ? execSync('where java', { encoding: 'utf-8' }).trim()
            : execSync('which java', { encoding: 'utf-8' }).trim()
      } catch (e) {
        console.warn('Could not determine java path:', e)
      }

      return {
        installed: true,
        version: version,
        javaPath: javaPath
      }
    }
  } catch (e) {
    console.warn('Java not found in PATH:', e)
    // Si es Windows, también intentar en rutas comunes
    if (process.platform === 'win32') {
      const commonPaths = [
        'C:\\Program Files\\Java',
        'C:\\Program Files (x86)\\Java',
        join(process.env.LOCALAPPDATA || '', 'Java')
      ]

      for (const basePath of commonPaths) {
        if (existsSync(basePath)) {
          try {
            const javaExe = join(basePath, 'bin', 'java.exe')
            if (existsSync(javaExe)) {
              const proc = spawnSync(javaExe, ['-version'], { encoding: 'utf-8' })
              const output = `${proc.stdout || ''}${proc.stderr || ''}`.trim()

              const versionMatch = output.match(/version "([^"]+)"/)
              if (versionMatch) {
                return {
                  installed: true,
                  version: versionMatch[1],
                  javaPath: javaExe
                }
              }
            }
          } catch (e) {
            console.warn('Error checking Java in common path:', e)
          }
        }
      }
    }
  }

  return {
    installed: false,
    version: null,
    javaPath: null
  }
}

/**
 * Verifica si la versión de Java es compatible con Minecraft
 * Minecraft Java Edition requiere Java 8 o superior
 * @param {string} version - Versión de Java
 * @returns {boolean}
 */
export function isJavaVersionCompatible(version) {
  try {
    // Extraer número principal de versión
    const majorVersion = parseInt(version.split('.')[0])
    // Java 8+ es compatible con Minecraft
    return majorVersion >= 8
  } catch {
    return false
  }
}
