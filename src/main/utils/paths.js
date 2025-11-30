import { join } from 'path'

/**
 * Obtiene la ruta base de Minecraft según la plataforma
 * @param {string} subdir - Subdirectorio opcional (ej: 'mods', 'shaderpacks')
 * @returns {string} Ruta completa
 */
export function getMinecraftPath(subdir = '') {
  let base

  if (process.platform === 'win32') {
    base = join(process.env.APPDATA || '', '.minecraft')
  } else if (process.platform === 'darwin') {
    base = join(process.env.HOME || '', 'Library/Application Support/minecraft')
  } else {
    base = join(process.env.HOME || '', '.minecraft')
  }

  return subdir ? join(base, subdir) : base
}

/**
 * Obtiene la ruta completa según el tipo de instalación
 * @param {string} type - Tipo: 'mods', 'shaderpack', 'resourcepack'
 * @param {string} filename - Nombre del archivo (opcional)
 * @returns {string} Ruta completa
 */
export function getPathForInstallType(type, filename = '') {
  let subdir

  switch (type) {
    case 'shaderpack':
      subdir = 'shaderpacks'
      break
    case 'resourcepack':
      subdir = 'resourcepacks'
      break
    default:
      subdir = 'mods'
  }

  const dir = getMinecraftPath(subdir)
  return filename ? join(dir, filename) : dir
}
