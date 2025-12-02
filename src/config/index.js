import {
  RECOMMENDED_MODS,
  OPTIONAL_MODS,
  AVAILABLE_SHADERS,
  SHADER_PRESETS,
  GRAPHICS_LEVEL_MODS
} from './mods-data.js'
import CreztYImage from '../renderer/src/assets/crezty.png'
import zmeyniImage from '../renderer/src/assets/zmeyni.png'

export { RECOMMENDED_MODS, OPTIONAL_MODS, AVAILABLE_SHADERS, SHADER_PRESETS, GRAPHICS_LEVEL_MODS }

export const MODS_SHARE = 'https://cloud.crezty.com/index.php/s/WGFJgMTYRRMBFSB'

export const FORGE_DOWNLOAD_URL =
  'https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.4.12/forge-1.20.1-47.4.12-installer.jar'

export const NEWS = [
  {
    id: 1,
    title: 'Agregado el sistema anti-robo',
    date: '2025-12-02',
    content: 'ya puedes proteger tu casa con el sistema anti-robo.'
  },
  {
    id: 2,
    title: 'Lanzamiento del launcher v1.0.4',
    date: '2025-12-02',
    content: 'El launcher ya esta listo para los usuarios, disfruta de la experiencia.'
  },
]

export const CREDITS = [
  {
    role: 'Desarrollador',
    name: 'Crezty',
    image: CreztYImage,
    url: 'https://crezty.com',
    description: 'Full Stack Developer & Creator'
  },
  {
    role: 'Diseñadora Gráfica',
    name: 'zmeyni',
    image: zmeyniImage,
    url: 'https://www.twitch.tv/zmeyni',
    description: 'UI/UX & Graphic Design'
  }
]

// Configuración de sincronización de cliente (FancyMenu, etc.)
// IMPORTANTE: El usuario debe actualizar URL y Hash con su propio zip
export const CLIENT_CONFIG = {
  url: 'http://cloud.crezty.com/index.php/s/ydamc2ZdH4MRwTJ/download/soulcraft_config.zip',
  hash: '67973CD6DECDBE65CBBA3E963F517B459124E4FAC60F5316827EAEDB422F034A', // Hash SHA256 del zip
  version: '1.0.2'
}

export default {
  MODS_SHARE,
  FORGE_DOWNLOAD_URL,
  NEWS,
  RECOMMENDED_MODS,
  OPTIONAL_MODS,
  AVAILABLE_SHADERS,
  SHADER_PRESETS
}
