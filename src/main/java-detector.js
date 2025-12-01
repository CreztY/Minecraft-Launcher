import { execSync, spawnSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

/**
 * Detecta si Java está instalado y retorna su versión
 * @returns {Promise<{installed: boolean, version: string | null, javaPath: string | null}>}
 */
/**
 * Detecta si Java está instalado y retorna su versión
 * @returns {Promise<{installed: boolean, version: string | null, javaPath: string | null}>}
 */
export async function checkJavaVersion() {
  // 1. Intentar con el comando 'java' en el PATH
  try {
    const result = await verifyJavaPath('java')
    if (result) return result
  } catch {
    console.warn('Java not found in PATH')
  }

  // 2. Intentar con JAVA_HOME
  if (process.env.JAVA_HOME) {
    const javaHomeBin = join(
      process.env.JAVA_HOME,
      'bin',
      process.platform === 'win32' ? 'java.exe' : 'java'
    )
    if (existsSync(javaHomeBin)) {
      const result = await verifyJavaPath(javaHomeBin)
      if (result) return result
    }
  }

  // 3. Estrategias específicas para Windows
  if (process.platform === 'win32') {
    // 3.1 Buscar en el Registro de Windows
    const registryPaths = getJavaPathsFromRegistry()
    for (const javaPath of registryPaths) {
      if (existsSync(javaPath)) {
        const result = await verifyJavaPath(javaPath)
        if (result) return result
      }
    }

    // 3.2 Buscar en rutas comunes
    const commonPaths = [
      'C:\\Program Files\\Java',
      'C:\\Program Files (x86)\\Java',
      'C:\\Program Files\\Eclipse Adoptium',
      'C:\\Program Files (x86)\\Eclipse Adoptium',
      'C:\\Program Files\\AdoptOpenJDK',
      'C:\\Program Files (x86)\\AdoptOpenJDK',
      'C:\\Program Files\\Amazon Corretto',
      'C:\\Program Files (x86)\\Amazon Corretto',
      'C:\\Program Files\\Azul Systems',
      'C:\\Program Files (x86)\\Azul Systems',
      'C:\\Program Files\\Microsoft',
      'C:\\Program Files (x86)\\Microsoft',
      join(process.env.LOCALAPPDATA || '', 'Java'),
      join(process.env.LOCALAPPDATA || '', 'Programs', 'Common', 'Java') // Oracle sometimes installs here
    ]

    for (const basePath of commonPaths) {
      if (existsSync(basePath)) {
        try {
          // Buscar subdirectorios (versiones)
          const subdirs = getSubdirectories(basePath)
          for (const subdir of subdirs) {
            const javaExe = join(basePath, subdir, 'bin', 'java.exe')
            if (existsSync(javaExe)) {
              const result = await verifyJavaPath(javaExe)
              if (result) return result
            }
          }

          // Intentar directamente en bin/java.exe (por si basePath es ya el JDK/JRE)
          const directJavaExe = join(basePath, 'bin', 'java.exe')
          if (existsSync(directJavaExe)) {
            const result = await verifyJavaPath(directJavaExe)
            if (result) return result
          }
        } catch (e) {
          console.warn(`Error checking Java in common path ${basePath}:`, e)
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
 * Helper para verificar una ruta de Java y obtener su versión
 */
async function verifyJavaPath(javaPath) {
  try {
    const proc = spawnSync(javaPath, ['-version'], { encoding: 'utf-8' })
    const output = `${proc.stdout || ''}${proc.stderr || ''}`.trim()
    const versionMatch = output.match(/version "([^"]+)"/)

    if (versionMatch) {
      const version = versionMatch[1]
      let resolvedPath = javaPath

      // Si usamos 'java' del PATH, intentamos resolver la ruta real
      if (javaPath === 'java') {
        try {
          resolvedPath =
            process.platform === 'win32'
              ? execSync('where java', { encoding: 'utf-8' }).split('\r\n')[0].trim()
              : execSync('which java', { encoding: 'utf-8' }).trim()
        } catch (e) {
          console.warn('Could not determine absolute java path from PATH:', e)
          // Si falla, seguimos devolviendo 'java' o null, pero mejor devolver null en javaPath si no es absoluto?
          // El código original devolvía null si fallaba 'where'. Mantengamos 'java' si no se resuelve, o null.
          // El original devolvía null.
          resolvedPath = null
        }
      }

      return {
        installed: true,
        version: version,
        javaPath: resolvedPath || javaPath // Fallback to input path if resolution fails but execution worked
      }
    }
  } catch {
    // Ignore error, just return null
  }
  return null
}

function getSubdirectories(source) {
  try {
    const { readdirSync, statSync } = require('fs')
    return readdirSync(source).filter((name) => {
      try {
        return statSync(join(source, name)).isDirectory()
      } catch {
        return false
      }
    })
  } catch {
    return []
  }
}

function getJavaPathsFromRegistry() {
  const paths = []
  try {
    // Claves comunes de registro para Java
    const keys = [
      'HKLM\\SOFTWARE\\JavaSoft\\Java Runtime Environment',
      'HKLM\\SOFTWARE\\JavaSoft\\Java Development Kit',
      'HKLM\\SOFTWARE\\JavaSoft\\JDK',
      'HKLM\\SOFTWARE\\WOW6432Node\\JavaSoft\\Java Runtime Environment',
      'HKLM\\SOFTWARE\\WOW6432Node\\JavaSoft\\Java Development Kit'
    ]

    for (const key of keys) {
      try {
        // Obtener versiones
        const proc = spawnSync('reg', ['query', key], { encoding: 'utf-8' })
        if (proc.status !== 0) continue

        const lines = proc.stdout.split('\n')
        for (const line of lines) {
          const match = line.trim().match(/\\([^\\]+)$/) // Obtener la última parte (versión)
          if (match) {
            const versionKey = line.trim()
            // Consultar JavaHome para esta versión
            const javaHomeProc = spawnSync('reg', ['query', versionKey, '/v', 'JavaHome'], {
              encoding: 'utf-8'
            })
            if (javaHomeProc.status === 0) {
              const javaHomeMatch = javaHomeProc.stdout.match(/JavaHome\s+REG_SZ\s+(.+)/)
              if (javaHomeMatch) {
                const javaHome = javaHomeMatch[1].trim()
                paths.push(join(javaHome, 'bin', 'java.exe'))
              }
            }
          }
        }
      } catch {
        // Ignore registry errors
      }
    }
  } catch (e) {
    console.warn('Error querying registry:', e)
  }
  return paths
}

/**
 * Verifica si la versión de Java es compatible con Minecraft
 * Minecraft Java Edition requiere Java 8 o superior
 * @param {string} version - Versión de Java
 * @returns {boolean}
 */
export function isJavaVersionCompatible(version) {
  try {
    const parts = version.split('.')
    let majorVersion = parseInt(parts[0])

    // Handle 1.x versions (e.g., 1.8.0_xxx)
    if (majorVersion === 1) {
      majorVersion = parseInt(parts[1])
    }

    // Java 8+ es compatible con Minecraft
    return majorVersion >= 8
  } catch {
    return false
  }
}
