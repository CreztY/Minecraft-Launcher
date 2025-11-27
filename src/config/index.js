// Configuración centralizada compartida entre main y renderer

export const NEXTCLOUD_SHARE = 'https://cloud.crezty.com/index.php/s/WGFJgMTYRRMBFSB'

export const FORGE_DOWNLOAD_URL =
  'https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.4.12/forge-1.20.1-47.4.12-installer.jar'

export const NEWS = [
  {
    id: 1,
    title: 'Actualización 1.2.0',
    date: '2025-11-20',
    content: "Nuevos mods añadidos: Create, Farmer's Delight"
  },
  {
    id: 2,
    title: 'Servidor actualizado',
    date: '2025-11-15',
    content: 'El servidor principal ha sido actualizado a la última versión'
  },
  {
    id: 3,
    title: 'Nuevos gráficos disponibles',
    date: '2025-11-10',
    content: 'Ahora puedes elegir entre gráficos altos y ultra'
  }
]

// Mods base recomendados (siempre se descargan)
export const BASE_MODS = [
  {
    id: 'fancymenu',
    filename: 'fancymenu_forge_3.8.1_MC_1.20.1.jar',
    name: 'Fancy Menu',
    version: '3.8.1',
    latestVersion: '3.7.2',
    hash: 'ba1ddf0f61def8ea87e7757ebb45f1390e1da0f7ebce1aff299b0a169b045858'
  },
  {
    id: 'konkrete',
    name: 'Konkrete',
    filename: 'konkrete_forge_1.8.0_MC_1.20-1.20.1.jar',
    version: '1.8.0',
    latestVersion: '1.7.2',
    hash: 'e78686b92c3761ec26eb9d3c53efdd3d6ca77981cbd3723995e1163b7103ae0b'
  },
  {
    id: 'jei',
    name: 'JEI (Just Enough Items)',
    filename: 'jei-1.20.1-forge-15.20.0.125.jar',
    version: '15.20.0.125',
    hash: null
  }
]

// Mods opcionales que se añaden según settings
export const OPTIONAL_MODS = {
  shaders: [
    {
      id: 'shadersmod',
      name: 'Shaders Mod',
      filename: 'shaders_pack_v2.zip',
      version: '2.1.0',
      hash: null,
      installType: 'shaderpack'
    }
  ],
  modpack: [
    {
      id: 'modpack',
      name: 'SoulCraft Resource Pack',
      filename: 'soulcraft_resourcepack_v1.zip',
      version: '1.0.3',
      latestVersion: '1.0.2',
      expectedHash: '933e2a7e79c4594f965f7f7d00b1f28a98ec2a180ad8f9f90310a266fe5cf5d8',
      installType: 'resourcepack'
    }
  ],
  minimap: [
    {
      id: 'xaeros_minimap',
      name: "Xaero's Minimap",
      filename: 'Xaeros_Minimap_25.2.10_Forge_1.20.jar',
      version: '25.2.10',
      hash: '2b5de085275d658e0445d783dbbcf9848c00aab8ac18cc2f664a62f44f78a18a'
    }
  ],
  map: [
    {
      id: 'xaeros_worldmap',
      name: "Xaero's World Map",
      filename: 'XaerosWorldMap_1.39.12_Forge_1.20.jar',
      version: '1.39.12',
      hash: 'c312ae6078bca65c179c74d3916fd22bff5dae70eef3c976b0ea7f3326d1917b'
    }
  ]
}

// Función para obtener mods recomendados basado en settings
export function getRecommendedMods(settings = {}) {
  const { graphicsLevel = 'normal', optionalMods = {} } = settings
  let mods = [...BASE_MODS]

  // Añadir mods opcionales si están habilitados
  Object.entries(optionalMods).forEach(([key, enabled]) => {
    if (enabled && OPTIONAL_MODS[key]) {
      mods = mods.concat(OPTIONAL_MODS[key])
    }
  })

  // Añadir mods gráficos según nivel seleccionado
  if (graphicsLevel === 'high' || graphicsLevel === 'ultra') {
    mods = mods.concat(OPTIONAL_MODS.shaders || [])
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

export const RECOMMENDED_MODS = BASE_MODS

// Lista para mostrar en el InfoTab (UI), puede diferir de RECOMMENDED_MODS
export const MODS_LIST = [
  { id: 1, name: 'Create', version: '1.20.1', category: 'Machinery' },
  { id: 2, name: "Farmer's Delight", version: '1.20.1', category: 'Food' },
  { id: 3, name: "Biomes O' Plenty", version: '1.20.1', category: 'Biomas' },
  { id: 4, name: 'Twilight Forest', version: '1.20.1', category: 'Dimensión' },
  { id: 5, name: 'Apotheosis', version: '1.20.1', category: 'Magia' },
  { id: 6, name: 'Quark', version: '1.20.1', category: 'Utilidad' },
  { id: 7, name: 'Thermal Expansion', version: '1.20.1', category: 'Tech' },
  { id: 8, name: 'Applied Energistics 2', version: '1.20.1', category: 'Tech' },
  { id: 9, name: 'Immersive Engineering', version: '1.20.1', category: 'Tech' },
  { id: 10, name: 'Mekanism', version: '1.20.1', category: 'Tech' },
  { id: 11, name: 'JEI', version: '1.20.1', category: 'UI' },
  { id: 12, name: 'WAILA', version: '1.20.1', category: 'UI' }
]

export default {
  NEXTCLOUD_SHARE,
  FORGE_DOWNLOAD_URL,
  NEWS,
  RECOMMENDED_MODS,
  BASE_MODS,
  OPTIONAL_MODS,
  getRecommendedMods,
  MODS_LIST
}
