// Configuración centralizada compartida entre main y renderer

export const MODS_SHARE = 'https://cloud.crezty.com/index.php/s/WGFJgMTYRRMBFSB'

export const FORGE_DOWNLOAD_URL =
  'https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.4.12/forge-1.20.1-47.4.12-installer.jar'

export const NEWS = [
  {
    id: 1,
    title: 'Lanzamiento del launcher v1.0.0',
    date: '2025-11-28',
    content: 'Ahora puedes descargar Todo lo necesario para jugar Minecraft desde el launcher.'
  }
]

// Mods base recomendados (siempre se descargan)
export const RECOMMENDED_MODS = [
  {
    id: 'AchievementOptimizer',
    filename: 'AchievementOptimizer-1.20.1-1.0.5.jar',
    name: 'Achievement Optimizer',
    description: 'Mod de optimización centrado en la gestión y el rendimiento de los logros.',
    version: '1.0.5',
    latestVersion: '1.0.5',
    hash: null
  },
  {
    id: 'AdChimneys',
    filename: 'AdChimneys-1.20.1-10.1.26.0-build.1752.jar',
    name: 'Additional Chimneys',
    description: 'Añade varias chimeneas decorativas y funcionales al juego.',
    version: '10.1.26.0',
    latestVersion: '10.1.26.0',
    hash: null
  },
  {
    id: 'AdvancementPlaques',
    filename: 'AdvancementPlaques-1.20.1-forge-1.6.9.jar',
    name: 'Advancement Plaques',
    description:
      'Cambia el aspecto de las notificaciones de logros/avances por unas placas más vistosas.',
    version: '1.6.9',
    latestVersion: '1.6.9',
    hash: null
  },
  {
    id: 'alexsmobs',
    filename: 'alexsmobs-1.22.9.jar',
    name: 'Alex’s Mobs',
    description: 'Añade una gran variedad de mobs nuevos, únicos y bien diseñados al mundo.',
    version: '1.22.9',
    latestVersion: '1.22.9',
    hash: null
  },
  {
    id: 'ambientadditions',
    filename: 'ambientadditions-1.20.1-1.1.2.jar',
    name: 'Ambient Additions',
    description: 'Agrega elementos para mejorar la ambientación y los detalles del entorno.',
    version: '1.1.2',
    latestVersion: '1.1.2',
    hash: null
  },
  {
    id: 'amendments',
    filename: 'amendments-1.20-2.2.3.jar',
    name: 'Amendments',
    description:
      'Añade pequeños pero útiles retoques y funcionalidades a bloques y mecánicas existentes.',
    version: '2.2.3',
    latestVersion: '2.2.3',
    hash: null
  },
  {
    id: 'animal_feeding_trough',
    filename: 'animal_feeding_trough-1.1.0+1.20.1-forge.jar',
    name: 'Animal Feeding Trough',
    description: 'Permite automatizar la alimentación de animales con un comedero.',
    version: '1.1.0',
    latestVersion: '1.1.0',
    hash: null
  },
  {
    id: 'appleskin',
    filename: 'appleskin-forge-mc1.20.1-2.5.1.jar',
    name: 'AppleSkin',
    description: 'Muestra información adicional sobre el hambre y la saturación de los alimentos.',
    version: '2.5.1',
    latestVersion: '2.5.1',
    hash: null
  },
  {
    id: 'architectury',
    filename: 'architectury-9.2.14-forge.jar',
    name: 'Architectury API',
    description:
      'Una librería API multi-plataforma necesaria para que funcionen muchos mods (incluyendo mods para Forge y Fabric).',
    version: '9.2.14',
    latestVersion: '9.2.14',
    hash: null
  },
  {
    id: 'AttributeFix',
    filename: 'AttributeFix-Forge-1.20.1-21.0.4.jar',
    name: 'AttributeFix',
    description:
      'Corrige y modifica los límites de los atributos por defecto en Minecraft, como el rango de ataque o la salud.',
    version: '21.0.4',
    latestVersion: '21.0.4',
    hash: null
  },
  {
    id: 'balm',
    filename: 'balm-forge-1.20.1-7.3.37-all.jar',
    name: 'Balm',
    description:
      'Librería base esencial para que funcionen varios mods creados por el mismo autor.',
    version: '7.3.37',
    latestVersion: '7.3.37',
    hash: null
  },
  {
    id: 'BetterBurning',
    filename: 'BetterBurning-Forge-1.20.1-9.0.2.jar',
    name: 'Better Burning',
    description: 'Mejora las mecánicas de quemado y combustible en hornos y fogatas.',
    version: '9.0.2',
    latestVersion: '9.0.2',
    hash: null
  },
  {
    id: 'bettercombat',
    filename: 'bettercombat-forge-1.8.6+1.20.1.jar',
    name: 'Better Combat',
    description:
      'Implementa un sistema de combate renovado, con animaciones más fluidas y ataque en todas direcciones.',
    version: '1.8.6',
    latestVersion: '1.8.6',
    hash: null
  },
  {
    id: 'BetterCompatibilityChecker',
    filename: 'BetterCompatibilityChecker-forge-4.0.8+mc1.20.1.jar',
    name: 'Better Compatibility Checker',
    description:
      'Ayuda a verificar la compatibilidad de los mods instalados, alertando sobre conflictos o versiones incorrectas.',
    version: '4.0.8',
    latestVersion: '4.0.8',
    hash: null
  },
  {
    id: 'BiomesOPlenty',
    filename: 'BiomesOPlenty-forge-1.20.1-19.0.0.96.jar',
    name: 'Biomes O’ Plenty',
    description: 'Añade una enorme cantidad de biomas nuevos y variados al Overworld y al Nether.',
    version: '19.0.0.96',
    latestVersion: '19.0.0.96',
    hash: null
  },
  {
    id: 'BN-Blood-Particles',
    filename: 'BN-Blood-Particles-1.20.1-2.0.0.jar',
    name: 'BN Blood Particles',
    description: 'Reemplaza las partículas de daño predeterminadas con efectos de sangre.',
    version: '2.0.0',
    latestVersion: '2.0.0',
    hash: null
  },
  {
    id: 'BOMD',
    filename: 'BOMD-Forge-1.20.1-1.1.2.jar',
    name: 'Block of Metal Dust',
    description: 'Añade la posibilidad de compactar polvos de metal en bloques de almacenamiento.',
    version: '1.1.2',
    latestVersion: '1.1.2',
    hash: null
  },
  {
    id: 'Bookshelf',
    filename: 'Bookshelf-Forge-1.20.1-20.2.13.jar',
    name: 'Bookshelf',
    description: 'Librería base compartida necesaria para que varios mods de Forge funcionen.',
    version: '20.2.13',
    latestVersion: '20.2.13',
    hash: null
  },
  {
    id: 'BOP_MES_compat_datapack',
    filename: 'BOP_MES_compat_datapack 1.20-1.21.zip',
    name: 'BOP & MES Compatibility Datapack',
    description:
      'Datapack para asegurar la compatibilidad entre Biomes O’ Plenty y Medieval Structures (MES).',
    version: '1.20-1.21',
    latestVersion: '1.20-1.21',
    hash: null
  },
  {
    id: 'brutalbosses',
    filename: 'brutalbosses-1.20.1-8.4.jar',
    name: 'Brutal Bosses',
    description: 'Mejora a los jefes de Minecraft con habilidades nuevas y más desafiantes.',
    version: '8.4',
    latestVersion: '8.4',
    hash: null
  },
  {
    id: 'caelus',
    filename: 'caelus-forge-3.2.0+1.20.1.jar',
    name: 'Caelus',
    description:
      'Una API de propósito general que maneja las ranuras de equipo volador (elytras, etc.).',
    version: '3.2.0',
    latestVersion: '3.2.0',
    hash: null
  },
  {
    id: 'camera',
    filename: 'camera-forge-1.20.1-1.0.20.jar',
    name: 'Camera Mod',
    description: 'Añade una cámara funcional al juego para tomar fotografías y decorar.',
    version: '1.0.20',
    latestVersion: '1.0.20',
    hash: null
  },
  {
    id: 'canary',
    filename: 'canary-mc1.20.1-0.3.3.jar',
    name: 'Canary',
    description:
      'Mod de optimización enfocado en el rendimiento del servidor y la generación de chunks.',
    version: '0.3.3',
    latestVersion: '0.3.3',
    hash: null
  },
  {
    id: 'CataclysmWeaponery',
    filename: 'CataclysmWeaponery2.0-1.20.1.jar',
    name: 'Cataclysm Weaponery 2.0',
    description: 'Añade nuevas y poderosas armas temáticas del mod Cataclysm.',
    version: '2.0',
    latestVersion: '2.0',
    hash: null
  },
  {
    id: 'celestisynth',
    filename: 'celestisynth-1.20.1-1.3.3-all.jar',
    name: 'Celestisynth',
    description: 'Introduce nuevos equipos, armas y mecánicas con temática celestial o mágica.',
    version: '1.3.3',
    latestVersion: '1.3.3',
    hash: null
  },
  {
    id: 'CerbonsAPI',
    filename: 'CerbonsAPI-Forge-1.20.1-1.1.0.jar',
    name: 'Cerbons API',
    description: 'Librería API necesaria para que funcionen los mods creados por Cerbon.',
    version: '1.1.0',
    latestVersion: '1.1.0',
    hash: null
  },
  {
    id: 'chisel',
    filename: 'chisel-forge-2.0.0+mc1.20.1.jar',
    name: 'Chisel',
    description:
      'Añade la herramienta "cincel" para modificar y obtener variaciones de bloques existentes, ideal para construcción.',
    version: '2.0.0',
    latestVersion: '2.0.0',
    hash: null
  },
  {
    id: 'chloride',
    filename: 'chloride-FORGE-mc1.20.1-v1.7.2.jar',
    name: 'Chloride',
    description: 'Mod de optimización para la renderización de partículas y efectos visuales.',
    version: '1.7.2',
    latestVersion: '1.7.2',
    hash: null
  },
  {
    id: 'citadel',
    filename: 'citadel-2.6.2-1.20.1.jar',
    name: 'Citadel',
    description:
      'Librería base necesaria para varios mods, especialmente aquellos que añaden mobs personalizados como Alex’s Mobs.',
    version: '2.6.2',
    latestVersion: '2.6.2',
    hash: null
  },
  {
    id: 'ClimateRivers',
    filename: 'ClimateRivers-v20.1.0-1.20.1-Forge.jar',
    name: 'Climate Rivers',
    description:
      'Mejora la generación de ríos, haciéndolos más grandes y con mejor integración en el terreno.',
    version: '20.1.0',
    latestVersion: '20.1.0',
    hash: null
  },
  {
    id: 'cloth-config',
    filename: 'cloth-config-11.1.136-forge.jar',
    name: 'Cloth Config API',
    description:
      'Librería API utilizada por muchos mods para crear menús de configuración unificados e intuitivos.',
    version: '11.1.136',
    latestVersion: '11.1.136',
    hash: null
  },
  {
    id: 'collective',
    filename: 'collective-1.20.1-8.13.jar',
    name: 'Collective',
    description:
      'Librería base que provee funcionalidades comunes para una colección de mods del mismo autor.',
    version: '8.13',
    latestVersion: '8.13',
    hash: null
  },
  {
    id: 'comforts',
    filename: 'comforts-forge-6.4.0+1.20.1.jar',
    name: 'Comforts',
    description:
      'Añade sacos de dormir y hamacas que funcionan como camas portátiles sin cambiar el punto de aparición.',
    version: '6.4.0',
    latestVersion: '6.4.0',
    hash: null
  },
  {
    id: 'create',
    filename: 'create-1.20.1-6.0.8.jar',
    name: 'Create',
    description:
      'Mod de ingeniería y automatización que añade mecánicas de rotación, poleas, y una variedad de máquinas estéticas y funcionales.',
    version: '6.0.8',
    latestVersion: '6.0.8',
    hash: null
  },
  {
    id: 'CreativeCore',
    filename: 'CreativeCore_FORGE_v2.12.32_mc1.20.1.jar',
    name: 'CreativeCore',
    description: 'Librería base necesaria para varios mods, incluyendo Fancy Menu.',
    version: '2.12.32',
    latestVersion: '2.12.32',
    hash: null
  },
  {
    id: 'cryonicconfig',
    filename: 'cryonicconfig-forge-1.0.0+mc1.20.1.jar',
    name: 'Cryonic Config',
    description:
      'Mod de utilidad para mejorar el manejo y la interfaz de la configuración de otros mods.',
    version: '1.0.0',
    latestVersion: '1.0.0',
    hash: null
  },
  {
    id: 'cupboard',
    filename: 'cupboard-1.20.1-2.7.jar',
    name: 'Cupboard',
    description:
      'Librería base utilizada por varios mods, proporcionando utilidades de código comunes.',
    version: '2.7',
    latestVersion: '2.7',
    hash: null
  },
  {
    id: 'curios',
    filename: 'curios-forge-5.14.1+1.20.1.jar',
    name: 'Curios API',
    description:
      'API esencial que añade nuevas ranuras de equipo (anillos, collares, etc.) para otros mods.',
    version: '5.14.1',
    latestVersion: '5.14.1',
    hash: null
  },
  {
    id: 'DarkestSouls',
    filename: 'DarkestSouls-Forge1.20.1-1.2.2.5.jar',
    name: 'Darkest Souls',
    description:
      'Añade elementos de dificultad y jugabilidad inspirados en juegos de tipo "Soulslike".',
    version: '1.2.2.5',
    latestVersion: '1.2.2.5',
    hash: null
  },
  {
    id: 'ddenizens',
    filename: 'ddenizens-1.20.1-1.5.0.jar',
    name: 'Ddenizens',
    description:
      'Añade una variedad de nuevos aldeanos y NPCs con diálogos e interacciones personalizadas.',
    version: '1.5.0',
    latestVersion: '1.5.0',
    hash: null
  },
  {
    id: 'deltaboxlib',
    filename: 'deltaboxlib-forge-2.2.0+1.20.1.jar',
    name: 'Delta Box Lib',
    description: 'Librería de código auxiliar para mods desarrollados por el autor Delta Box.',
    version: '2.2.0',
    latestVersion: '2.2.0',
    hash: null
  },
  {
    id: 'DistantHorizons',
    filename: 'DistantHorizons-2.3.6-b-1.20.1-fabric-forge.jar',
    name: 'Distant Horizons',
    description:
      'Extiende drásticamente la distancia de renderizado mostrando un horizonte de bloques de bajo detalle.',
    version: '2.3.6-b',
    latestVersion: '2.3.6-b',
    hash: null
  },
  {
    id: 'DungeonsArise',
    filename: 'DungeonsArise-1.20.x-2.1.58-release.jar',
    name: 'Dungeons Arise',
    description:
      'Añade una gran variedad de estructuras nuevas, mazmorras y puntos de interés al mundo.',
    version: '2.1.58',
    latestVersion: '2.1.58',
    hash: null
  },
  {
    id: 'dungeons_enhanced',
    filename: 'dungeons_enhanced-1.20.1-5.4.3.jar',
    name: 'Dungeons Enhanced',
    description:
      'Mejora y expande las mazmorras subterráneas existentes con más variedad y desafíos.',
    version: '5.4.3',
    latestVersion: '5.4.3',
    hash: null
  },
  {
    id: 'durabilitytooltip',
    filename: 'durabilitytooltip-1.1.6-forge-mc1.20.jar',
    name: 'Durability Tooltip',
    description:
      'Muestra la durabilidad numérica de un ítem directamente en su información emergente (tooltip).',
    version: '1.1.6',
    latestVersion: '1.1.6',
    hash: null
  },
  {
    id: 'dynamiclights',
    filename: 'dynamiclights-v1.9-mc1.17-1.21.5-mod.jar',
    name: 'Dynamic Lights',
    description:
      'Permite que los ítems que emiten luz (como antorchas) la emitan mientras el jugador los sostiene.',
    version: '1.21.5',
    latestVersion: '1.21.5',
    hash: null
  },
  {
    id: 'EasyAnvils',
    filename: 'EasyAnvils-v8.0.2-1.20.1-Forge.jar',
    name: 'Easy Anvils',
    description:
      'Mejora la experiencia con los yunques, potencialmente reduciendo el coste de reparación o previniendo su rotura.',
    version: '8.0.2',
    latestVersion: '8.0.2',
    hash: null
  },
  {
    id: 'EasyMagic',
    filename: 'EasyMagic-v8.0.1-1.20.1-Forge.jar',
    name: 'Easy Magic',
    description:
      'Mejora la mesa de encantamientos, permitiendo ver todos los encantamientos posibles y el coste.',
    version: '8.0.1',
    latestVersion: '8.0.1',
    hash: null
  },
  {
    id: 'EFMxIrons',
    filename: 'EFMxIronsV3.1-1.20.1.zip',
    name: 'Epic Fight & Iron’s Spells Compatibility',
    description:
      'Pack de compatibilidad para hacer que Epic Fight y Iron’s Spellbooks funcionen juntos correctamente.',
    version: '3.1',
    latestVersion: '3.1',
    hash: null
  },
  {
    id: 'embeddium',
    filename: 'embeddium-0.3.31+mc1.20.1.jar',
    name: 'Embeddium',
    description: 'Mod de optimización de rendimiento (fork de Sodium) para Forge.',
    version: '0.3.31',
    latestVersion: '0.3.31',
    hash: null
  },
  {
    id: 'emotecraft',
    filename: 'emotecraft-for-MC1.20.1-2.2.7-b.build.50-forge.jar',
    name: 'Emotecraft',
    description: 'Añade un sistema de emotes/emociones animados y personalizables a tu personaje.',
    version: '2.2.7-b.build.50',
    latestVersion: '2.2.7-b.build.50',
    hash: null
  },
  {
    id: 'EnchantmentDescriptions',
    filename: 'EnchantmentDescriptions-Forge-1.20.1-17.1.19.jar',
    name: 'Enchantment Descriptions',
    description:
      'Añade una descripción útil a todos los encantamientos cuando pasas el ratón sobre ellos.',
    version: '17.1.19',
    latestVersion: '17.1.19',
    hash: null
  },
  {
    id: 'endrem',
    filename: 'endrem_forge-5.3.3-R-1.20.1.jar',
    name: 'End Remastered',
    description:
      'Cambia la forma de acceder al End, requiriendo encontrar y usar nuevos ojos del End.',
    version: '5.3.3',
    latestVersion: '5.3.3',
    hash: null
  },
  {
    id: 'Epic-Elden-Ring-Mod',
    filename: 'Epic-Elden-Ring-Mod-Forge-1.20.1.jar',
    name: 'Epic Elden Ring Mod',
    description:
      'Implementa elementos, armas, armaduras y mecánicas inspiradas en el juego Elden Ring.',
    version: '1.20.1',
    latestVersion: '1.20.1',
    hash: null
  },
  {
    id: 'epicfight',
    filename: 'epicfight-forge-20.13.6-1.20.1.jar',
    name: 'Epic Fight',
    description:
      'Sistema de combate totalmente renovado con animaciones de ataque, esquiva y posturas tipo RPG.',
    version: '20.13.6',
    latestVersion: '20.13.6',
    hash: null
  },
  {
    id: 'FallingTree',
    filename: 'FallingTree-1.20.1-4.3.4.jar',
    name: 'Falling Tree',
    description:
      'Permite talar árboles enteros instantáneamente rompiendo solo el bloque inferior.',
    version: '4.3.4',
    latestVersion: '4.3.4',
    hash: null
  },
  {
    id: 'fancymenu',
    filename: 'fancymenu_forge_3.8.1_MC_1.20.1.jar',
    name: 'Fancy Menu',
    description:
      'Permite personalizar completamente los menús del juego con animaciones y botones.',
    version: '3.8.1',
    latestVersion: '3.8.1',
    hash: null
  },
  {
    id: 'fantasyfurniture',
    filename: 'fantasyfurniture-1.20.1-9.0.0.jar',
    name: 'Fantasy Furniture',
    description: 'Añade una variedad de muebles decorativos con un estilo de fantasía medieval.',
    version: '9.0.0',
    latestVersion: '9.0.0',
    hash: null
  },
  {
    id: 'ferritecore',
    filename: 'ferritecore-6.0.1-forge.jar',
    name: 'FerriteCore',
    description:
      'Mod de optimización de rendimiento que reduce el uso de memoria RAM para la carga de texturas.',
    version: '6.0.1',
    latestVersion: '6.0.1',
    hash: null
  },
  {
    id: 'ForgeEndertech',
    filename: 'ForgeEndertech-1.20.1-11.1.9.0-build.1584.jar',
    name: 'Forge Endertech',
    description:
      'Librería base esencial para que funcionen varios mods relacionados con la tecnología o la dimensión End.',
    version: '11.1.9.0',
    latestVersion: '11.1.9.0',
    hash: null
  },
  {
    id: 'ftb-library',
    filename: 'ftb-library-forge-2001.2.10.jar',
    name: 'FTB Library',
    description:
      'Librería base de utilidades para todos los mods de la serie Feed The Beast (FTB), como FTB Quests.',
    version: '2001.2.10',
    latestVersion: '2001.2.10',
    hash: null
  },
  {
    id: 'ftb-quests',
    filename: 'ftb-quests-forge-2001.4.16.jar',
    name: 'FTB Quests',
    description:
      'Permite crear y gestionar sistemas de misiones personalizados dentro del juego, ideal para modpacks.',
    version: '2001.4.16',
    latestVersion: '2001.4.16',
    hash: null
  },
  {
    id: 'ftb-teams',
    filename: 'ftb-teams-forge-2001.3.1.jar',
    name: 'FTB Teams',
    description:
      'Permite a los jugadores formar equipos en el juego, integrándose con mods como FTB Quests.',
    version: '2001.3.1',
    latestVersion: '2001.3.1',
    hash: null
  },
  {
    id: 'geckolib',
    filename: 'geckolib-forge-1.20.1-4.8.2.jar',
    name: 'GeckoLib',
    description:
      'Librería de animación esencial para mods que introducen modelos animados complejos (como mobs o ítems).',
    version: '4.8.2',
    latestVersion: '4.8.2',
    hash: null
  },
  {
    id: 'GlitchCore',
    filename: 'GlitchCore-forge-1.20.1-0.0.1.1.jar',
    name: 'GlitchCore',
    description: 'Librería base para mods creados por el desarrollador Glitchfiend.',
    version: '0.0.1.1',
    latestVersion: '0.0.1.1',
    hash: null
  },
  {
    id: 'gottschcore',
    filename: 'gottschcore-1.20.1-2.5.1.jar',
    name: 'GottschCore',
    description:
      'Librería base esencial para una variedad de mods, especialmente los de decoración y construcción.',
    version: '2.5.1',
    latestVersion: '2.5.1',
    hash: null
  },
  {
    id: 'gravestone',
    filename: 'gravestone-forge-1.20.1-1.0.35.jar',
    name: 'Gravestone Mod',
    description:
      'Genera una lápida en el lugar de la muerte del jugador, almacenando todos los ítems perdidos.',
    version: '1.0.35',
    latestVersion: '1.0.35',
    hash: null
  },
  {
    id: 'hyper_remaster',
    filename: 'hyper_remaster-final-forge-1.20.1.jar',
    name: 'Hyper Remaster',
    description:
      'Mod que añade nuevas armas y equipos con un enfoque en el combate avanzado o RPG.',
    version: 'final',
    latestVersion: 'final',
    hash: null
  },
  {
    id: 'Iceberg',
    filename: 'Iceberg-1.20.1-forge-1.1.25.jar',
    name: 'Iceberg',
    description:
      'Librería de utilidades para mods del mismo desarrollador, facilitando funciones como el manejo de datos.',
    version: '1.1.25',
    latestVersion: '1.1.25',
    hash: null
  },
  {
    id: 'idas',
    filename: 'idas_forge-1.12.1+1.20.1.jar',
    name: 'Integrated Dungeons and Structures',
    description: 'Añade numerosas estructuras al mundo, mejorando la exploración y la diversidad.',
    version: '1.12.1',
    latestVersion: '1.12.1',
    hash: null
  },
  {
    id: 'ImmediatelyFast',
    filename: 'ImmediatelyFast-Forge-1.5.2+1.20.4.jar',
    name: 'ImmediatelyFast',
    description:
      'Mod de optimización que acelera la renderización de la interfaz de usuario y otros aspectos.',
    version: '1.5.2',
    latestVersion: '1.5.2',
    hash: null
  },
  {
    id: 'impactful',
    filename: 'impactful-20.13.1.jar',
    name: 'Impactful',
    description:
      'Mod que añade nuevos efectos y animaciones visuales para un combate más impactante.',
    version: '20.13.1',
    latestVersion: '20.13.1',
    hash: null
  },
  {
    id: 'indestructible',
    filename: 'indestructible-20.12.0.jar',
    name: 'Indestructible',
    description:
      'Mod de utilidad que puede hacer que ciertos ítems o bloques sean irrompibles o inamovibles.',
    version: '20.12.0',
    latestVersion: '20.12.0',
    hash: null
  },
  {
    id: 'integrated_api',
    filename: 'integrated_api-1.5.3+1.20.1-forge.jar',
    name: 'Integrated API',
    description: 'Librería base para facilitar la integración entre varios mods en el juego.',
    version: '1.5.3',
    latestVersion: '1.5.3',
    hash: null
  },
  {
    id: 'irons_spellbooks',
    filename: 'irons_spellbooks-1.20.1-3.4.0.11.jar',
    name: 'Iron’s Spellbooks',
    description:
      'Añade un extenso sistema de magia con libros de hechizos, varitas y un sistema de maná.',
    version: '3.4.0.11',
    latestVersion: '3.4.0.11',
    hash: null
  },
  {
    id: 'ItemPhysic',
    filename: 'ItemPhysic_FORGE_v1.8.9_mc1.20.1.jar',
    name: 'ItemPhysic',
    description:
      'Mejora la física de los ítems caídos, haciéndolos rotar y caer de forma más realista.',
    version: '1.8.9',
    latestVersion: '1.8.9',
    hash: null
  },
  {
    id: 'Jade',
    filename: 'Jade-1.20.1-Forge-11.13.2.jar',
    name: 'Jade (Just Another D... Extensión)',
    description:
      'Muestra información detallada sobre el bloque o entidad que estás mirando (sucesor de WAILA/Hwyla).',
    version: '11.13.2',
    latestVersion: '11.13.2',
    hash: null
  },
  {
    id: 'jei',
    filename: 'jei-1.20.1-forge-15.20.0.125.jar',
    name: 'JEI (Just Enough Items)',
    description: 'Muestra todas las recetas de crafteo y usos de ítems en una lista lateral.',
    version: '15.20.0.125',
    latestVersion: '15.20.0.125',
    hash: null
  },
  {
    id: 'jet_and_elias_armors',
    filename: 'jet_and_elias_armors-1.4-1.20.1-CF.jar',
    name: 'Jet and Elias Armors',
    description:
      'Añade un conjunto de armaduras con diseños inspirados en personajes o temas específicos (probablemente Final Fantasy).',
    version: '1.4',
    latestVersion: '1.4',
    hash: null
  },
  {
    id: 'justenoughbreeding',
    filename: 'justenoughbreeding-forge-1.20-1.20.1-2.3.0.jar',
    name: 'Just Enough Breeding',
    description:
      'Muestra las recetas de cría de animales, similar a cómo JEI muestra las recetas de crafteo.',
    version: '2.3.0',
    latestVersion: '2.3.0',
    hash: null
  },
  {
    id: 'JustEnoughProfessions',
    filename: 'JustEnoughProfessions-forge-1.20.1-3.0.1.jar',
    name: 'Just Enough Professions',
    description: 'Muestra los bloques de trabajo requeridos para las profesiones de los aldeanos.',
    version: '3.0.1',
    latestVersion: '3.0.1',
    hash: null
  },
  {
    id: 'konkrete',
    filename: 'konkrete_forge_1.8.0_MC_1.20-1.20.1.jar',
    name: 'Konkrete',
    description:
      'Librería base necesaria para que funcionen FancyMenu y otros mods del mismo desarrollador.',
    version: '1.8.0',
    latestVersion: '1.8.0',
    hash: null
  },
  {
    id: 'kotlinforforge',
    filename: 'kotlinforforge-4.11.0-all.jar',
    name: 'Kotlin for Forge',
    description:
      'Librería de soporte necesaria para mods escritos en el lenguaje de programación Kotlin.',
    version: '4.11.0',
    latestVersion: '4.11.0',
    hash: null
  },
  {
    id: 'KryptonReforged',
    filename: 'KryptonReforged-0.2.3.jar',
    name: 'Krypton Reforged',
    description:
      'Mod de optimización de red que mejora el rendimiento del multijugador y la comunicación con el servidor.',
    version: '0.2.3',
    latestVersion: '0.2.3',
    hash: null
  },
  {
    id: 'LeavesBeGone',
    filename: 'LeavesBeGone-v8.0.0-1.20.1-Forge.jar',
    name: 'Leaves Be Gone',
    description:
      'Permite que las hojas de los árboles se descompongan más rápido después de talar el tronco.',
    version: '8.0.0',
    latestVersion: '8.0.0',
    hash: null
  },
  {
    id: 'letsdo-wildernature',
    filename: 'letsdo-wildernature-forge-1.0.6.jar',
    name: 'Let’s Do Wilderness & Nature',
    description:
      'Añade contenido de temática natural y salvaje, como nuevas plantas, biomas o estructuras naturales.',
    version: '1.0.6',
    latestVersion: '1.0.6',
    hash: null
  },
  {
    id: 'lionfishapi',
    filename: 'lionfishapi-2.4-Fix.jar',
    name: 'Lionfish API',
    description: 'Librería base de utilidades y soporte para mods creados por el autor Lionfish.',
    version: '2.4',
    latestVersion: '2.4',
    hash: null
  },
  {
    id: 'lithostitched',
    filename: 'lithostitched-forge-1.20.1-1.4.11.jar',
    name: 'Lithostitched',
    description:
      'Mod de optimización para la creación de atlas de texturas (texture stitching), mejorando el rendimiento.',
    version: '1.4.11',
    latestVersion: '1.4.11',
    hash: null
  },
  {
    id: 'lootr',
    filename: 'lootr-forge-1.20-0.7.35.93.jar',
    name: 'Lootr',
    description:
      'Asegura que los cofres de botín se abran individualmente por jugador en servidores multijugador.',
    version: '0.7.35.93',
    latestVersion: '0.7.35.93',
    hash: null
  },
  {
    id: 'lukis-grand-capitals',
    filename: 'lukis-grand-capitals-1.1.2.jar',
    name: 'Luki’s Grand Capitals',
    description: 'Añade estructuras de ciudades y capitales grandes y detalladas al mundo.',
    version: '1.1.2',
    latestVersion: '1.1.2',
    hash: null
  },
  {
    id: 'L_Enders_Cataclysm',
    filename: 'L_Enders_Cataclysm-3.16.jar',
    name: 'L-Ender’s Cataclysm',
    description: 'Introduce nuevos y poderosos jefes, ítems y desafíos para el juego tardío.',
    version: '3.16',
    latestVersion: '3.16',
    hash: null
  },
  {
    id: 'majrusz-library',
    filename: 'majrusz-library-forge-1.20.1-7.0.8.jar',
    name: 'Majrusz Library',
    description:
      'Librería base requerida para mods creados por el autor Majrusz, como Majrusz’s Difficulty.',
    version: '7.0.8',
    latestVersion: '7.0.8',
    hash: null
  },
  {
    id: 'majruszs-difficulty',
    filename: 'majruszs-difficulty-forge-1.20.1-1.9.10.jar',
    name: 'Majrusz’s Difficulty',
    description:
      'Añade un sistema de dificultad dinámico, haciendo el juego progresivamente más desafiante.',
    version: '1.9.10',
    latestVersion: '1.9.10',
    hash: null
  },
  {
    id: 'mcw-bridges',
    filename: 'mcw-bridges-3.1.0-mc1.20.1forge (1).jar',
    name: 'Macaw’s Bridges (Copia)',
    description: 'Añade una variedad de puentes de diferentes estilos y materiales al juego.',
    version: '3.1.0',
    latestVersion: '3.1.0',
    hash: null
  },
  {
    id: 'mcw-bridges_original',
    filename: 'mcw-bridges-3.1.0-mc1.20.1forge.jar',
    name: 'Macaw’s Bridges',
    description: 'Añade una variedad de puentes de diferentes estilos y materiales al juego.',
    version: '3.1.0',
    latestVersion: '3.1.0',
    hash: null
  },
  {
    id: 'mcw-fences',
    filename: 'mcw-fences-1.2.0-1.20.1forge.jar',
    name: 'Macaw’s Fences and Walls',
    description: 'Añade nuevas vallas y muros con diseños y opciones de conexión variadas.',
    version: '1.2.0',
    latestVersion: '1.2.0',
    hash: null
  },
  {
    id: 'mcw-furniture',
    filename: 'mcw-furniture-3.4.0-mc1.20.1forge.jar',
    name: 'Macaw’s Furniture',
    description:
      'Añade una gran variedad de muebles decorativos para la construcción de interiores.',
    version: '3.4.0',
    latestVersion: '3.4.0',
    hash: null
  },
  {
    id: 'mcw-mcwholidays',
    filename: 'mcw-mcwholidays-1.1.1-mc1.20.1forge.jar',
    name: 'Macaw’s Holidays',
    description: 'Añade decoraciones y elementos temáticos para festividades al juego.',
    version: '1.1.1',
    latestVersion: '1.1.1',
    hash: null
  },
  {
    id: 'mcw-mcwwindows',
    filename: 'mcw-mcwwindows-2.4.1-mc1.20.1forge.jar',
    name: 'Macaw’s Windows',
    description: 'Añade una variedad de ventanas y contraventanas con diseños estéticos.',
    version: '2.4.1',
    latestVersion: '2.4.1',
    hash: null
  },
  {
    id: 'medieval_buildings',
    filename: 'medieval_buildings-1.20.1-1.1.3-forge.jar',
    name: 'Medieval Buildings',
    description:
      'Añade estructuras prefabricadas con diseños de construcciones medievales al mundo.',
    version: '1.1.3',
    latestVersion: '1.1.3',
    hash: null
  },
  {
    id: 'melody',
    filename: 'melody_forge_1.0.3_MC_1.20.1-1.20.4.jar',
    name: 'Melody',
    description:
      'Un mod de música o sonido que añade nuevas pistas o altera la forma en que se reproduce el audio.',
    version: '1.0.3',
    latestVersion: '1.0.3',
    hash: null
  },
  {
    id: 'mes',
    filename: 'mes-1.4.6-1.20.jar',
    name: 'Medieval Structures (MES)',
    description:
      'Introduce una variedad de estructuras y puntos de interés de estilo medieval para explorar.',
    version: '1.4.6',
    latestVersion: '1.4.6',
    hash: null
  },
  {
    id: 'minecraft-comes-alive-Reworked',
    filename: 'minecraft-comes-alive-Reworked-1.20.1.jar',
    name: 'Minecraft Comes Alive Reworked',
    description:
      'Revampa el sistema de aldeanos, permitiendo a los jugadores interactuar, casarse y tener hijos.',
    version: '1.20.1',
    latestVersion: '1.20.1',
    hash: null
  },
  {
    id: 'modernfix',
    filename: 'modernfix-forge-5.25.1+mc1.20.1.jar',
    name: 'ModernFix',
    description:
      'Mod de optimización de rendimiento y corrección de errores, centrado en mejorar la experiencia general.',
    version: '5.25.1',
    latestVersion: '5.25.1',
    hash: null
  },
  {
    id: 'MoogsNetherStructures',
    filename: 'MoogsNetherStructures-1.20-2.0.2.jar',
    name: 'Moog’s Nether Structures',
    description: 'Añade nuevas estructuras y mazmorras al Nether para mejorar la exploración.',
    version: '2.0.2',
    latestVersion: '2.0.2',
    hash: null
  },
  {
    id: 'MoogsVoyagerStructures',
    filename: 'MoogsVoyagerStructures-1.20-5.0.21.jar',
    name: 'Moog’s Voyager Structures',
    description: 'Añade estructuras de estilo aventurero o de viaje al Overworld.',
    version: '5.0.21',
    latestVersion: '5.0.21',
    hash: null
  },
  {
    id: 'moogs_structure_lib',
    filename: 'moogs_structure_lib-1.1.0-1.20-1.20.4-forge.jar',
    name: 'Moog’s Structure Lib',
    description: 'Librería base necesaria para que funcionen los mods de estructuras de Moog.',
    version: '1.1.0',
    latestVersion: '1.1.0',
    hash: null
  },
  {
    id: 'moonlight',
    filename: 'moonlight-1.20-2.16.16-forge.jar',
    name: 'Moonlight Lib',
    description:
      'Librería base de propósito general requerida para varios mods, ofreciendo utilidades de código.',
    version: '2.16.16',
    latestVersion: '2.16.16',
    hash: null
  },
  {
    id: 'moremobvariants',
    filename: 'moremobvariants-forge+1.20.1-1.3.0.1.jar',
    name: 'More Mob Variants',
    description:
      'Añade una variedad de texturas y modelos diferentes a los mobs existentes para mayor diversidad visual.',
    version: '1.3.0.1',
    latestVersion: '1.3.0.1',
    hash: null
  },
  {
    id: 'MoreStructures-SpacingTweaks',
    filename: 'MoreStructures-SpacingTweaks-1.20.1-2.1.56.zip',
    name: 'More Structures Spacing Tweaks',
    description:
      'Datapack/mod que ajusta la generación y espaciado de estructuras para una mejor distribución.',
    version: '2.1.56',
    latestVersion: '2.1.56',
    hash: null
  },
  {
    id: 'MouseTweaks',
    filename: 'MouseTweaks-forge-mc1.20.1-2.25.1.jar',
    name: 'Mouse Tweaks',
    description:
      'Mejora la gestión de inventario añadiendo atajos y funciones rápidas para el ratón.',
    version: '2.25.1',
    latestVersion: '2.25.1',
    hash: null
  },
  {
    id: 'mss',
    filename: 'mss-1.2.7-1.20.jar',
    name: 'Majrusz’s Structures (MSS)',
    description:
      'Añade nuevas estructuras y puntos de interés al mundo, complementando Majrusz’s Difficulty.',
    version: '1.2.7',
    latestVersion: '1.2.7',
    hash: null
  },
  {
    id: 'mythicmounts',
    filename: 'mythicmounts-20.1-7.4.2-forge.jar',
    name: 'Mythic Mounts',
    description: 'Añade nuevas y fantásticas monturas con habilidades únicas para la exploración.',
    version: '7.4.2',
    latestVersion: '7.4.2',
    hash: null
  },
  {
    id: 'NaturesCompass',
    filename: 'NaturesCompass-1.20.1-1.11.2-forge.jar',
    name: 'Nature’s Compass',
    description:
      'Añade una brújula que permite localizar y viajar a cualquier bioma del juego (incluyendo los de mods).',
    version: '1.11.2',
    latestVersion: '1.11.2',
    hash: null
  },
  {
    id: 'OctoLib',
    filename: 'OctoLib-FORGE-0.5.0.1+1.20.1.jar',
    name: 'OctoLib',
    description:
      'Librería base requerida para mods desarrollados por el autor "TheRealestOctopus".',
    version: '0.5.0.1',
    latestVersion: '0.5.0.1',
    hash: null
  },
  {
    id: 'palegardenbackport',
    filename: 'palegardenbackport-forge-2.0.3+1.20.1.jar',
    name: 'Pale Garden Backport',
    description:
      'Retroporta contenido de la dimensión "Pale Garden" (probablemente de otro mod) a esta versión.',
    version: '2.0.3',
    latestVersion: '2.0.3',
    hash: null
  },
  {
    id: 'PassiveSkillTree',
    filename: 'PassiveSkillTree-1.20.1-BETA-0.7.2c-all.jar',
    name: 'Passive Skill Tree',
    description:
      'Implementa un árbol de habilidades pasivas para mejorar las estadísticas del jugador con puntos de experiencia.',
    version: '0.7.2c',
    latestVersion: '0.7.2c',
    hash: null
  },
  {
    id: 'passiveskilltreeadditions',
    filename: 'passiveskilltreeadditions-1.1.2.jar',
    name: 'Passive Skill Tree Additions',
    description:
      'Expansión o complemento para el mod Passive Skill Tree, añadiendo más habilidades o contenido.',
    version: '1.1.2',
    latestVersion: '1.1.2',
    hash: null
  },
  {
    id: 'pickableorbs',
    filename: 'pickableorbs-1.20.1-3.1.1.jar',
    name: 'Pickable Orbs',
    description:
      'Permite que el jugador recoja los orbes de experiencia cuando está en el modo creativo o espectador.',
    version: '3.1.1',
    latestVersion: '3.1.1',
    hash: null
  },
  {
    id: 'Ping-Wheel',
    filename: 'Ping-Wheel-1.12.0-forge-1.20.1.jar',
    name: 'Ping Wheel',
    description:
      'Añade un sistema de "ping" para marcar lugares o entidades en el mundo a otros jugadores.',
    version: '1.12.0',
    latestVersion: '1.12.0',
    hash: null
  },
  {
    id: 'player-animation-lib',
    filename: 'player-animation-lib-forge-1.0.2-rc1+1.20.jar',
    name: 'Player Animation Lib',
    description:
      'Librería necesaria para mods que alteran o añaden animaciones al modelo del jugador.',
    version: '1.0.2-rc1',
    latestVersion: '1.0.2-rc1',
    hash: null
  },
  {
    id: 'PlayerRevive',
    filename: 'PlayerRevive_FORGE_v2.0.31_mc1.20.1.jar',
    name: 'Player Revive',
    description:
      'Implementa un sistema de "derribo y resurrección" para el multijugador, evitando la muerte inmediata.',
    version: '2.0.31',
    latestVersion: '2.0.31',
    hash: null
  },
  {
    id: 'Prism',
    filename: 'Prism-1.20.1-forge-1.0.5.jar',
    name: 'Prism',
    description: 'Librería base de utilidades para mods del desarrollador "Team Twilight".',
    version: '1.0.5',
    latestVersion: '1.0.5',
    hash: null
  },
  {
    id: 'projectvibrantjourneys',
    filename: 'projectvibrantjourneys-1.20.1-6.2.0.jar',
    name: 'Project Vibrant Journeys',
    description:
      'Añade una gran cantidad de pequeños detalles estéticos al ambiente para hacer la exploración más interesante.',
    version: '6.2.0',
    latestVersion: '6.2.0',
    hash: null
  },
  {
    id: 'PuzzlesLib',
    filename: 'PuzzlesLib-v8.1.33-1.20.1-Forge.jar',
    name: 'Puzzles Lib',
    description:
      'Librería base de propósito general necesaria para que muchos mods funcionen correctamente.',
    version: '8.1.33',
    latestVersion: '8.1.33',
    hash: null
  },
  {
    id: 'Quark',
    filename: 'Quark-4.0-462.jar',
    name: 'Quark',
    description:
      'Mod que añade muchas características de "vainilla mejorada" (vanilla+), como nuevos bloques, ítems y mecánicas discretas.',
    version: '4.0-462',
    latestVersion: '4.0-462',
    hash: null
  },
  {
    id: 'railcraft-reborn',
    filename: 'railcraft-reborn-1.20.1-1.1.10.jar',
    name: 'Railcraft Reborn',
    description:
      'Mod de tecnología que expande enormemente el sistema de raíles y carros con nuevas vías, máquinas y bloques.',
    version: '1.1.10',
    latestVersion: '1.1.10',
    hash: null
  },
  {
    id: 'realmrpg_skeletons',
    filename: 'realmrpg_skeletons-1.1.0-forge-1.20.1.jar',
    name: 'Realm RPG Skeletons',
    description:
      'Mod que añade diferentes tipos de esqueletos con atributos y equipos variados para un toque RPG.',
    version: '1.1.0',
    latestVersion: '1.1.0',
    hash: null
  },
  {
    id: 'relics',
    filename: 'relics-1.20.1-0.8.0.11.jar',
    name: 'Relics',
    description: 'Añade artefactos y reliquias raras con poderosos efectos o habilidades pasivas.',
    version: '0.8.0.11',
    latestVersion: '0.8.0.11',
    hash: null
  },
  {
    id: 'Ribbits',
    filename: 'Ribbits-1.20.1-Forge-3.0.4.jar',
    name: 'Ribbits',
    description:
      'Añade ranas al juego con comportamientos realistas y posiblemente ítems asociados.',
    version: '3.0.4',
    latestVersion: '3.0.4',
    hash: null
  },
  {
    id: 'saturn',
    filename: 'saturn-mc1.20.1-0.1.3.jar',
    name: 'Saturn',
    description:
      'Mod de optimización para la carga de recursos y las estructuras de datos, mejorando el rendimiento.',
    version: '0.1.3',
    latestVersion: '0.1.3',
    hash: null
  },
  {
    id: 'sebas_cataclysm',
    filename: 'sebas_cataclysm_1.3.zip',
    name: 'Sebas Cataclysm Data Pack',
    description:
      'Data pack que complementa o añade contenido al mod Cataclysm, posiblemente armas o recetas.',
    version: '1.3',
    latestVersion: '1.3',
    hash: null
  },
  {
    id: 'sound-physics-remastered',
    filename: 'sound-physics-remastered-forge-1.20.1-1.5.1.jar',
    name: 'Sound Physics Remastered',
    description:
      'Mejora el sistema de sonido añadiendo reverberación, oclusión y dispersión de sonido realista.',
    version: '1.5.1',
    latestVersion: '1.5.1',
    hash: null
  },
  {
    id: 'spark',
    filename: 'spark-1.10.53-forge.jar',
    name: 'Spark',
    description:
      'Herramienta de diagnóstico para perfilar el rendimiento del servidor y el cliente, buscando cuellos de botella.',
    version: '1.10.53',
    latestVersion: '1.10.53',
    hash: null
  },
  {
    id: 'stalwart-dungeons',
    filename: 'stalwart-dungeons-1.20.1-1.2.8.jar',
    name: 'Stalwart Dungeons',
    description:
      'Añade una gran variedad de nuevas y desafiantes mazmorras para explorar, con botines únicos.',
    version: '1.2.8',
    latestVersion: '1.2.8',
    hash: null
  },
  {
    id: 'starterkit',
    filename: 'starterkit-1.20.1-7.4.jar',
    name: 'Starter Kit',
    description:
      'Permite que los jugadores empiecen con un conjunto de ítems predefinidos al unirse al mundo por primera vez.',
    version: '7.4',
    latestVersion: '7.4',
    hash: null
  },
  {
    id: 'structure_gel',
    filename: 'structure_gel-1.20.1-2.16.2.jar',
    name: 'Structure Gel API',
    description:
      'Librería base utilizada por varios mods para facilitar la generación de estructuras complejas.',
    version: '2.16.2',
    latestVersion: '2.16.2',
    hash: null
  },
  {
    id: 'supermartijn642configlib',
    filename: 'supermartijn642configlib-1.1.8-forge-mc1.20.jar',
    name: 'SuperMartijn642’s Config Lib',
    description:
      'Librería de configuración para mods creados por el desarrollador SuperMartijn642.',
    version: '1.1.8',
    latestVersion: '1.1.8',
    hash: null
  },
  {
    id: 'supplementaries',
    filename: 'supplementaries-1.20-3.1.41.jar',
    name: 'Supplementaries',
    description:
      'Añade una colección de ítems decorativos y funcionales para rellenar huecos en el juego vanilla.',
    version: '3.1.41',
    latestVersion: '3.1.41',
    hash: null
  },
  {
    id: 'tectonic',
    filename: 'tectonic-3.0.17-forge-1.20.1.jar',
    name: 'Tectonic',
    description:
      'Mod de optimización o utilidad que afecta la carga y manejo de chunks y el mundo.',
    version: '3.0.17',
    latestVersion: '3.0.17',
    hash: null
  },
  {
    id: 'TerraBlender',
    filename: 'TerraBlender-forge-1.20.1-3.0.1.10.jar',
    name: 'TerraBlender',
    description:
      'API que permite a los mods inyectar nuevos biomas en la generación del mundo sin causar problemas de transición.',
    version: '3.0.1.10',
    latestVersion: '3.0.1.10',
    hash: null
  },
  {
    id: 'Terralith',
    filename: 'Terralith_1.20.x_v2.5.4.jar',
    name: 'Terralith',
    description:
      'Mod de generación de mundo que añade más de 85 biomas nuevos y únicos al Overworld.',
    version: '2.5.4',
    latestVersion: '2.5.4',
    hash: null
  },
  {
    id: 'travelersbackpack',
    filename: 'travelersbackpack-forge-1.20.1-9.1.46.jar',
    name: 'Traveler’s Backpack',
    description:
      'Añade mochilas portátiles que ofrecen espacio de almacenamiento adicional y estaciones de crafteo/fluidos.',
    version: '9.1.46',
    latestVersion: '9.1.46',
    hash: null
  },
  {
    id: 'underlay',
    filename: 'underlay-1.20.1-v0.9.7-f.jar',
    name: 'Underlay',
    description:
      'Mod que altera o mejora la forma en que se muestran los ítems bajo el cursor, útil para la interfaz.',
    version: '0.9.7',
    latestVersion: '0.9.7',
    hash: null
  },
  {
    id: 'VisualWorkbench',
    filename: 'VisualWorkbench-v8.0.1-1.20.1-Forge.jar',
    name: 'Visual Workbench',
    description:
      'Muestra los ítems que se están crafteando en la mesa de crafteo directamente en el bloque.',
    version: '8.0.1',
    latestVersion: '8.0.1',
    hash: null
  },
  {
    id: 'voicechat',
    filename: 'voicechat-forge-1.20.1-2.6.6.jar',
    name: 'Simple Voice Chat',
    description:
      'Añade chat de voz posicional al multijugador, donde el volumen depende de la distancia.',
    version: '2.6.6',
    latestVersion: '2.6.6',
    hash: null
  },
  {
    id: 'waystones',
    filename: 'waystones-forge-1.20.1-14.1.17.jar',
    name: 'Waystones',
    description:
      'Añade bloques de "Waystone" que funcionan como puntos de teletransporte rápido entre ubicaciones.',
    version: '14.1.17',
    latestVersion: '14.1.17',
    hash: null
  },
  {
    id: 'weaponmaster_ydm',
    filename: 'weaponmaster_ydm-forge-1.20.1-4.2.3.jar',
    name: 'Weapon Master YDM',
    description:
      'Introduce nuevos tipos de armas y un sistema de combate enfocado en el dominio de diferentes armamentos.',
    version: '4.2.3',
    latestVersion: '4.2.3',
    hash: null
  },
  {
    id: 'XaerosWorldMap',
    filename: 'XaerosWorldMap_1.39.12_Forge_1.20.jar',
    name: 'Xaero’s Worldmap',
    description:
      'Añade un mapa del mundo completo en pantalla con la posibilidad de marcar puntos de interés.',
    version: '1.39.12',
    latestVersion: '1.39.12',
    hash: null
  },
  {
    id: 'Xaeros_Minimap',
    filename: 'Xaeros_Minimap_25.2.10_Forge_1.20.jar',
    name: 'Xaero’s Minimap',
    description:
      'Añade un minimapa configurable en la esquina de la pantalla para navegación local.',
    version: '25.2.10',
    latestVersion: '25.2.10',
    hash: null
  },
  {
    id: 'YungsApi',
    filename: 'YungsApi-1.20-Forge-4.0.6.jar',
    name: 'Yung’s API',
    description:
      'Librería base para los mods de Yung, que mejoran las estructuras de generación del mundo.',
    version: '4.0.6',
    latestVersion: '4.0.6',
    hash: null
  },
  {
    id: 'Zeta',
    filename: 'Zeta-1.0-30.jar',
    name: 'Zeta',
    description: 'Librería base de propósito general necesaria para varios mods.',
    version: '1.0-30',
    latestVersion: '1.0-30',
    hash: null
  },
  {
    id: 'ctov',
    filename: '[forge]ctov-3.4.14.jar',
    name: 'ChoiceTheater of Villages',
    description: 'Mejora la apariencia de los pueblos y añade nuevas variantes estéticas.',
    version: '3.4.14',
    latestVersion: '3.4.14',
    hash: null
  },
  {
    id: 'slu',
    filename: '[FORGE]slu_9970.1.20.1.jar',
    name: 'Starlight Utilities',
    description:
      'Mod de optimización o utilidad que proporciona mejoras de rendimiento o funcionalidad de bajo nivel.',
    version: '9970.1.20.1',
    latestVersion: '9970.1.20.1',
    hash: null
  },
  {
    id: 'betterfpsdist',
    name: 'Better Fps Dist',
    filename: 'betterfpsdist-1.20.1-6.0.jar',
    version: '6.0',
    latestVersion: null,
    hash: null,
    description: 'Un mod que agrega algunas mejoras de rendimiento para aumentar los fps.'
  },
  {
    id: 'jumpoverfences',
    name: 'Jump Over Fences',
    filename: 'jumpoverfences-forge-1.20.1-1.3.1.jar',
    version: '1.3.1',
    latestVersion: null,
    hash: null,
    description: 'Un mod que te permite saltar por encima de las vallas.'
  },
  {
    id: 'emi',
    name: 'EMI',
    filename: 'emi-1.1.22+1.20.1+forge.jar',
    version: '1.1.22',
    latestVersion: null,
    hash: null,
    description:
      'Visor de artículos y recetas moderno, accesible y repleto de funciones, con compatibilidad con JEI.'
  },
  {
    id: 'equipmentcompare',
    name: 'Equipment Compare',
    filename: 'EquipmentCompare-1.20.1-forge-1.3.7.jar',
    version: '1.3.7',
    latestVersion: null,
    hash: null,
    description:
      'Un mod que te permite comparar los artículos que tienes equipados con los que tienes en la mochila.'
  },
  {
    id: 'nosetonotick',
    name: 'No See No Tick',
    filename: 'NoSeeNoTick-2.0.0-1.20.1.jar',
    version: '2.0.0',
    latestVersion: null,
    hash: null,
    description:
      'Mod de rendimiento configurable que aumenta el rendimiento de la entidad al detener los tics en función de la distancia.'
  },
  {
    id: 'betteradvancements',
    name: 'Better Advancements',
    filename: 'BetterAdvancements-Forge-1.20.1-0.4.2.25.jar',
    version: '0.4.2.25',
    latestVersion: null,
    hash: null,
    description: 'Sucesor de BetterAchievements para el nuevo sistema de avances.'
  },
  {
    id: 'betterthirdperson',
    name: 'Better Third Person',
    filename: 'BetterThirdPerson-Forge-1.20-1.9.0.jar',
    version: '1.9.0',
    latestVersion: null,
    hash: null,
    description: 'Mejora la vista de la cámara en tercera persona.'
  },
  {
    id: 'zume',
    name: 'Zume',
    filename: 'zume-1.2.0.jar',
    version: '1.2.0',
    latestVersion: null,
    hash: null,
    description: 'Añade la funcionalidad de hacer zoom en el mundo.'
  },
  {
    id: 'entityculling',
    name: 'Entity Culling',
    filename: 'entityculling-forge-1.9.3-mc1.20.1.jar',
    version: '1.9.3',
    latestVersion: null,
    hash: null,
    description: 'Omitir la representación de entidades ocultas (mejora el rendimiento).'
  },
  {
    id: 'legendarytooltips',
    name: 'Legendary Tooltips',
    filename: 'LegendaryTooltips-1.20.1-forge-1.4.5.jar',
    version: '1.4.5',
    latestVersion: null,
    hash: null,
    description: 'Cambia el formato de los tooltips para que sean más bonitos.'
  }
]

// Mods opcionales que se añaden según settings
export const OPTIONAL_MODS = {
  shaders: [],
  modpack: [
    {
      id: 'modpack',
      name: 'Alacrity',
      description: 'Resource Pack que mejora drásticamente las texturas y modelos del juego.',
      filename: 'Alacrity.zip',
      version: '32',
      latestVersion: '31',
      expectedHash: null,
      installType: 'resourcepack'
    }
  ],
  minimap: [
    {
      id: 'xaeros_minimap',
      name: "Xaero's Minimap",
      description: 'Minimapa en pantalla para orientarte y ver entidades cercanas.',
      filename: 'Xaeros_Minimap_25.2.10_Forge_1.20.jar',
      version: '25.2.10',
      hash: '2b5de085275d658e0445d783dbbcf9848c00aab8ac18cc2f664a62f44f78a18a'
    }
  ],
  map: [
    {
      id: 'xaeros_worldmap',
      name: "Xaero's World Map",
      description: 'Mapa del mundo completo que registra por dónde has explorado.',
      filename: 'XaerosWorldMap_1.39.12_Forge_1.20.jar',
      version: '1.39.12',
      hash: 'c312ae6078bca65c179c74d3916fd22bff5dae70eef3c976b0ea7f3326d1917b'
    }
  ]
}

// Definición de Shaders disponibles
export const AVAILABLE_SHADERS = {
  oculus: {
    id: 'oculus',
    name: 'Oculus',
    description: 'Mod de optimización y soporte para Shaders (fork de Iris).',
    filename: 'oculus-mc1.20.1-1.8.0.jar',
    version: '1.8.0',
    hash: null,
    installType: 'mods'
  },
  complementary_reimagined: {
    id: 'complementary_reimagined',
    name: 'Complementary Reimagined',
    description: 'Shader equilibrado con estética vanilla mejorada y gran rendimiento.',
    filename: 'ComplementaryReimagined_r5.6.1.zip',
    version: '5.6.1',
    hash: null,
    installType: 'shaderpack'
  },
  complementary_unbound: {
    id: 'complementary_unbound',
    name: 'Complementary Unbound',
    description: 'Versión desbloqueada de Complementary para máximo realismo.',
    filename: 'ComplementaryUnbound_r5.6.1.zip',
    version: '5.6.1',
    hash: null,
    installType: 'shaderpack'
  },
  sildurs_extreme: {
    id: 'sildurs_extreme',
    name: "Sildur's Vibrant Shaders Extreme",
    description: 'Shader de alto rendimiento con iluminación volumétrica intensa.',
    filename: 'Sildurs_Vibrant_Shaders_v1.50_Extreme.zip', // Placeholder
    version: '1.50',
    hash: null,
    installType: 'shaderpack'
  },
  sildurs_high: {
    id: 'sildurs_high',
    name: "Sildur's Vibrant Shaders High",
    description: 'Versión alta de Sildurs, buen balance visual.',
    filename: 'Sildurs_Vibrant_Shaders_v1.50_High.zip', // Placeholder
    version: '1.50',
    hash: null,
    installType: 'shaderpack'
  },
  sildurs_medium: {
    id: 'sildurs_medium',
    name: "Sildur's Vibrant Shaders Medium",
    description: 'Versión media de Sildurs, para gráficas de gama media.',
    filename: 'Sildurs_Vibrant_Shaders_v1.50_Medium.zip', // Placeholder
    version: '1.50',
    hash: null,
    installType: 'shaderpack'
  },
  sildurs_lite: {
    id: 'sildurs_lite',
    name: "Sildur's Vibrant Shaders Lite",
    description: 'Versión ligera de Sildurs, ideal para PCs de bajos recursos.',
    filename: 'Sildurs_Vibrant_Shaders_v1.50_Lite.zip', // Placeholder
    version: '1.50',
    hash: null,
    installType: 'shaderpack'
  }
}

// Presets de Shaders según calidad
export const SHADER_PRESETS = {
  ultra: {
    name: 'Ultra (RTX 3060+ / RX 6700+)',
    shaders: ['oculus', 'complementary_reimagined', 'sildurs_extreme']
  },
  high: {
    name: 'Alta (RTX 2060 / GTX 1080)',
    shaders: ['oculus', 'sildurs_high', 'complementary_reimagined']
  },
  medium: {
    name: 'Media (GTX 1060 / RX 580)',
    shaders: ['oculus', 'sildurs_medium']
  },
  low: {
    name: 'Baja (Intel Iris Xe / Vega 7-8)',
    shaders: ['oculus', 'sildurs_medium', 'sildurs_lite']
  },
  potato: {
    name: 'Muy Baja (Gama baja antigua)',
    shaders: ['oculus', 'sildurs_lite']
  }
}

// Mods que se añaden según el nivel gráfico
export const GRAPHICS_LEVEL_MODS = {
  normal: [], // Sin mods adicionales
  basic: [
    {
      id: 'modelgapfix',
      name: 'Model Gap Fix',
      description: 'Arregla los huecos entre los modelos.',
      filename: 'modelfix-1.15.jar',
      version: '1.15',
      hash: null,
      installType: 'mods'
    },
    {
      id: 'darkpaintings',
      name: 'Dark Paintings',
      description: 'Añade más cuadros al juego.',
      filename: 'DarkPaintings-Forge-1.20.1-17.0.5.jar',
      version: '17.0.5',
      hash: null,
      installType: 'mods'
    },
    {
      id: 'betterambientsounds',
      name: 'Better Ambient Sounds',
      description: 'Mejora los sonidos ambientales del juego.',
      filename: 'BettAmbientSounds_FORGE_v6.1.11_mc1.20.1.jar',
      version: '6.1.11',
      hash: null,
      installType: 'mods'
    }
  ],
  high: [
    {
      id: 'modelgapfix',
      name: 'Model Gap Fix',
      description: 'Arregla los huecos entre los modelos.',
      filename: 'modelfix-1.15.jar',
      version: '1.15',
      hash: null,
      installType: 'mods'
    },
    {
      id: 'darkpaintings',
      name: 'Dark Paintings',
      description: 'Añade más cuadros al juego.',
      filename: 'DarkPaintings-Forge-1.20.1-17.0.5.jar',
      version: '17.0.5',
      hash: null,
      installType: 'mods'
    },
    {
      id: 'betterambientsounds',
      name: 'Better Ambient Sounds',
      description: 'Mejora los sonidos ambientales del juego.',
      filename: 'BettAmbientSounds_FORGE_v6.1.11_mc1.20.1.jar',
      version: '6.1.11',
      hash: null,
      installType: 'mods'
    },
    {
      id: 'skinlayers3d',
      name: 'SkinLayers 3D',
      description: 'Añade modelos 3D a bloques y objetos para más detalle.',
      filename: 'skinlayers3d-forge-1.9.2-mc1.20.1.jar',
      version: '1.9.2',
      hash: null,
      installType: 'mods'
    },
    {
      id: 'prettyrain',
      name: 'Pretty Rain',
      description: 'Mejora los efectos de lluvia, nieve y viento.',
      filename: 'Pretty Rain-1.20.1-Forge-1.1.3.jar',
      version: '1.1.3',
      hash: null,
      installType: 'mods'
    }
  ]
}

// Función para obtener mods recomendados basado en settings
export function getRecommendedMods(settings = {}) {
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

export default {
  MODS_SHARE,
  FORGE_DOWNLOAD_URL,
  NEWS,
  RECOMMENDED_MODS,
  OPTIONAL_MODS,
  AVAILABLE_SHADERS,
  SHADER_PRESETS,
  getRecommendedMods
}
