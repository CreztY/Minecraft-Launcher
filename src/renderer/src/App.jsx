import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import ProgressBar from './components/ProgressBar'
import HomeTab from './components/HomeTab'
import NewsTab from './components/NewsTab'
import InfoTab from './components/InfoTab'
import SettingsTab from './components/SettingsTab'
import PlayButton from './components/PlayButton'
import JavaPopup from './components/JavaPopup'
import ForgePopup from './components/ForgePopup'
import ModsProgress from './components/ModsProgress'
import UpdateNotification from './components/UpdateNotification'
import ModsDownloadPopup from './components/ModsDownloadPopup'
import RepairPopup from './components/RepairPopup'
import ConfigUpdatePopup from './components/ConfigUpdatePopup'
import ToastContainer from './components/ToastContainer'
import { useToast } from './hooks/useToast'
import { FORGE_DOWNLOAD_URL, MODS_SHARE, NEWS } from '../../config'

function App() {
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('home')
  const [javaInstalled, setJavaInstalled] = useState(null)
  const [javaVersion, setJavaVersion] = useState(null)
  const [forgeStatus, setForgeStatus] = useState(null)
  const [forgeVersion, setForgeVersion] = useState(null)
  const [modsStatus, setModsStatus] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadingItem, setDownloadingItem] = useState('')
  const [downloadingMod, setDownloadingMod] = useState(null)
  const [showJavaPopup, setShowJavaPopup] = useState(false)
  const [showForgePopup, setShowForgePopup] = useState(false)
  const [showModsPopup, setShowModsPopup] = useState(false)
  const [showRepairPopup, setShowRepairPopup] = useState(false)
  const [showConfigPopup, setShowConfigPopup] = useState(false)
  const [isConfigUpdating, setIsConfigUpdating] = useState(false)

  // Configuración
  const [ramAllocation, setRamAllocation] = useState(12)
  const [maxRAM, setMaxRAM] = useState(32)
  const [graphicsLevel, setGraphicsLevel] = useState('normal')
  const [shaderPreset, setShaderPreset] = useState('high')
  const [optionalMods, setOptionalMods] = useState({
    shaders: true,
    modpack: true,
    minimap: true,
    map: true
  })
  const [modBlacklist, setModBlacklist] = useState([])
  const [isRamLoading, setIsRamLoading] = useState(true)

  // Noticias desde configuración
  const [news] = useState(NEWS)

  const checkJava = useCallback(async () => {
    try {
      // Llamada segura al main process expuesta por preload
      const javaInfo = await window.api.checkJava()
      setJavaInstalled(Boolean(javaInfo.installed && javaInfo.compatible))
      setJavaVersion(javaInfo.version)

      // Mostrar popup si no está instalado o no es compatible
      if (!javaInfo.installed || !javaInfo.compatible) {
        setShowJavaPopup(true)
      }

      return javaInfo
    } catch (error) {
      console.error('Error checking Java:', error)
      // Fallback a búsqueda manual
      setJavaInstalled(false)
      setShowJavaPopup(true)
      return { installed: false, compatible: false, version: null }
    }
  }, [])

  const checkForgeVersion = useCallback(async () => {
    try {
      const forgeInfo = await window.api.checkForgeVersion()
      setForgeStatus(forgeInfo.status)
      setForgeVersion(forgeInfo.version)

      // Mostrar popup si no está instalado o no es compatible
      if (!forgeInfo.compatible) {
        setShowForgePopup(true)
      } else {
        setShowForgePopup(false)
        // Si Forge es compatible, asegurar que la RAM esté actualizada
        const result = await window.api.updateLauncherProfile(ramAllocation)
        if (!result.ok) {
          toast.warning('No se pudo actualizar el perfil del launcher')
        }
      }

      return forgeInfo
    } catch (error) {
      console.error('Error checking Forge:', error)
      toast.error('Error al verificar Forge')
      return { status: 'notInstalled', compatible: false }
    }
  }, [ramAllocation, toast])

  // Helper: Calcular cantidad de mods que necesitan descarga
  const countModsNeedingDownload = useCallback((modsStatus) => {
    if (!modsStatus) return 0
    return (
      (modsStatus.missing?.length || 0) +
      (modsStatus.modified?.length || 0) +
      (modsStatus.outdated?.length || 0) +
      (modsStatus.corrupted?.length || 0) +
      (modsStatus.unused?.length || 0)
    )
  }, [])

  const checkMods = useCallback(async () => {
    try {
      const settings = {
        graphicsLevel,
        optionalMods,
        ramAllocation,
        shaderPreset,
        modBlacklist
      }
      const modsInfo = await window.api.checkMods(settings)
      setModsStatus(modsInfo)

      // Mostrar popup si hay mods faltantes, modificados, desactualizados o corruptos
      if (countModsNeedingDownload(modsInfo) > 0) {
        setShowModsPopup(true)
      }

      return modsInfo
    } catch (error) {
      console.error('Error checking mods:', error)
      toast.error('Error al verificar mods')
      setModsStatus(null)
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphicsLevel, optionalMods, ramAllocation, shaderPreset, modBlacklist])

  const checkConfig = useCallback(async () => {
    try {
      const status = await window.api.checkConfig()
      if (status.status === 'outdated') {
        setShowConfigPopup(true)
      }
    } catch (error) {
      console.error('Error checking config:', error)
    }
  }, [])

  useEffect(() => {
    if (isRamLoading) return

    const timer = setTimeout(async () => {
      try {
        await Promise.all([checkJava(), checkForgeVersion(), checkMods(), checkConfig()])
      } catch (error) {
        console.error('Error en escaneo automático:', error)
      }
    }, 500)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRamLoading])

  // Auto-refresh mods when blacklist changes
  useEffect(() => {
    if (!isRamLoading) {
      // Small delay to ensure settings are saved/propagated
      const timer = setTimeout(() => {
        checkMods()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [modBlacklist, checkMods, isRamLoading])

  // Escuchar eventos de progreso de descarga de mods enviados por el main
  useEffect(() => {
    if (!window.api || !window.api.onModsDownloadProgress) return

    const off = window.api.onModsDownloadProgress((data) => {
      if (data.type === 'start') {
        setDownloadingMod({ id: data.id, filename: data.filename })
        // Calcular progreso base: (mods_completados / total) * 100
        const current = data.current || 1
        const total = data.total || 1
        const baseProgress = ((current - 1) / total) * 100
        setProgress(baseProgress)
        setDownloadingItem(`Descargando ${data.filename} (${current}/${total})`)
      } else if (data.type === 'progress') {
        // Progreso fino: base + (porcentaje_actual / total)
        const current = data.current || 1
        const total = data.total || 1
        const baseProgress = ((current - 1) / total) * 100
        const fileProgress = (data.percent || 0) / total
        setProgress(Math.min(99, baseProgress + fileProgress))
      } else if (data.type === 'complete') {
        if (data.ok) {
          // Si es el último, 100%, si no, calcular base del siguiente
          const current = data.current || 1
          const total = data.total || 1
          const progress = (current / total) * 100
          setProgress(progress)
        } else {
          console.error('Download failed for', data.filename, data.error)
          // Extraer solo el primer error para evitar mensajes repetitivos
          const errorMsg = data.error?.split(',')[0]?.trim() || 'Error desconocido'
          toast.error(`Error al descargar ${data.filename}: ${errorMsg}`)
        }
      } else if (data.type === 'delete-start') {
        setDownloadingMod({ id: data.id, filename: data.filename })
        setDownloadingItem('Borrando antiguo: ' + data.filename)
        setProgress(0)
      } else if (data.type === 'delete-complete') {
        setProgress(10)
        if (!data.ok) console.error('Delete failed', data.filename, data.error)
      } else if (data.type === 'done') {
        setIsDownloading(false)
        setDownloadingItem('')
        setDownloadingMod(null)
        setTimeout(() => setProgress(0), 1200)
      }
    })

    return () => {
      if (typeof off === 'function') off()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Escuchar eventos de actualización de configuración
  useEffect(() => {
    if (!window.api || !window.api.onConfigUpdateProgress) return

    const off = window.api.onConfigUpdateProgress((data) => {
      if (data.type === 'start') {
        setIsConfigUpdating(true)
      } else if (data.type === 'done') {
        setIsConfigUpdating(false)
        setShowConfigPopup(false)
        toast.success('Configuración actualizada correctamente')
      } else if (data.type === 'error') {
        setIsConfigUpdating(false)
        toast.error(`Error al actualizar configuración: ${data.error}`)
      }
    })

    return () => {
      if (typeof off === 'function') off()
    }
  }, [toast])

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // 1. FALTABA await aquí
        const settings = await window.api.getSettings()

        // 2. Primero obtener la RAM del sistema
        const systemRAM = await window.api.getSystemRAM()
        setMaxRAM(systemRAM)

        // 3. Si hay settings guardados, cargarlos
        if (settings) {
          setRamAllocation(settings.ramAllocation || Math.min(12, systemRAM))
          setGraphicsLevel(settings.graphicsLevel || 'normal')
          setShaderPreset(settings.shaderPreset || 'high')
          setModBlacklist(settings.modBlacklist || [])
          setOptionalMods(
            settings.optionalMods || {
              shaders: true,
              modpack: true,
              minimap: true,
              map: true
            }
          )
        } else {
          // Si no hay settings, usar valores por defecto
          const defaultRAM = Math.min(12, systemRAM)
          setRamAllocation(defaultRAM)
        }
      } catch (error) {
        console.error('Error al cargar configuración:', error)
        // En caso de error, establecer valores por defecto
        const systemRAM = 16 // Fallback
        setMaxRAM(systemRAM)
        setRamAllocation(Math.min(12, systemRAM))
      } finally {
        setIsRamLoading(false)
      }
    }

    loadSettings()
  }, [])

  // Guardar configuración cuando cambie
  useEffect(() => {
    if (!isRamLoading) {
      const timeoutId = setTimeout(() => {
        const settings = {
          maxRAM,
          ramAllocation,
          graphicsLevel,
          optionalMods,
          shaderPreset,
          modBlacklist
        }
        window.api.saveSettings(settings)

        if (forgeStatus === 'exact' || forgeStatus === 'acceptable') {
          window.api.updateLauncherProfile(ramAllocation)
        }
      }, 500) // Esperar 500ms antes de guardar

      return () => clearTimeout(timeoutId)
    }
  }, [
    ramAllocation,
    graphicsLevel,
    optionalMods,
    maxRAM,
    isRamLoading,
    forgeStatus,
    shaderPreset,
    modBlacklist
  ])

  const handleDownloadJava = async () => {
    // Usar API segura expuesta por preload
    try {
      await window.api.openExternal('https://www.java.com/es/download/manual.jsp')
    } catch (e) {
      console.error('openExternal failed', e)
      // Fallback: abrir en nueva ventana (puede bloquearse)
      window.open('https://www.java.com/es/download/manual.jsp', '_blank')
    }
    setShowJavaPopup(false)
  }

  const handleDownloadForge = async () => {
    try {
      await window.api.openExternal(FORGE_DOWNLOAD_URL)
    } catch (e) {
      console.error('openExternal failed', e)
      window.open(FORGE_DOWNLOAD_URL, '_blank')
    }
    setShowForgePopup(false)
  }

  const getModsToProcess = useCallback((modsStatus, includeAll = true) => {
    if (!modsStatus) return []
    const { missing = [], modified = [], outdated = [], corrupted = [], unused = [] } = modsStatus
    return includeAll
      ? [...missing, ...modified, ...outdated, ...corrupted, ...unused]
      : [...outdated, ...corrupted, ...unused]
  }, [])
  const prepareModsPayload = useCallback((mods, cleanInstall = false) => {
    return mods.map((m) => ({
      id: m.id,
      filename: m.filename,
      oldFilename: cleanInstall ? null : m.installedFilename || null,
      installType: m.installType || 'mods'
    }))
  }, [])

  const handleModsDownload = async (updateOnly = false) => {
    const toProcess = getModsToProcess(modsStatus, !updateOnly)
    if (toProcess.length === 0) {
      setShowModsPopup(false)
      return
    }

    // Separar mods a eliminar de los que se van a descargar
    const itemsToDelete = toProcess.filter((m) => m.reason === 'disabled_in_settings')
    const itemsToDownload = toProcess.filter((m) => m.reason !== 'disabled_in_settings')

    const payload = prepareModsPayload(itemsToDownload)
    // Para los items a borrar, necesitamos pasar el objeto completo o al menos path/id/filename
    const deletePayload = itemsToDelete.map((m) => ({
      id: m.id,
      filename: m.filename,
      path: m.path,
      installType: m.installType
    }))

    setShowModsPopup(false)
    setIsDownloading(true)
    setDownloadingItem(updateOnly ? 'Actualizando mods' : 'Sincronizando mods')

    try {
      await window.api.updateMods(MODS_SHARE, payload, deletePayload)
    } catch (error) {
      console.error('Error downloading/updating mods:', error)
      toast.error('Error al descargar/actualizar mods')
      setIsDownloading(false)
      setDownloadingMod(null)
    }
  }

  const handleDownloadMods = () => handleModsDownload(false)
  const handleUpdateMods = () => handleModsDownload(true)

  const handleRepairInstallation = async () => {
    try {
      setIsDownloading(true)
      setDownloadingItem('Reparando instalación...')
      setProgress(0)
      setShowRepairPopup(false)

      // 1. Ejecutar limpieza en backend
      await window.api.repairInstallation()

      // 2. Verificar estado (Forge y Mods)
      // Esto mostrará el popup de Forge si falta
      await checkForgeVersion()

      // Obtener estado actualizado de mods (deberían faltar todos)
      const modsInfo = await checkMods()

      if (modsInfo) {
        const toProcess = getModsToProcess(modsInfo)
        if (toProcess.length > 0) {
          setDownloadingItem('Descargando mods...')
          const payload = prepareModsPayload(toProcess, true) // Instalación limpia
          await window.api.updateMods(MODS_SHARE, payload)
        }
      }

      setIsDownloading(false)
      setDownloadingItem('')
      setProgress(0)
    } catch (error) {
      console.error('Error repairing installation:', error)
      toast.error(`Error al reparar instalación: ${error.message}`)
      setIsDownloading(false)
      setDownloadingItem('')
    }
  }

  const handleConfigUpdate = async () => {
    try {
      setIsConfigUpdating(true)
      await window.api.updateConfig()
    } catch (error) {
      console.error('Error updating config:', error)
      toast.error('Error al iniciar actualización de configuración')
      setIsConfigUpdating(false)
    }
  }

  const handlePlay = async () => {
    // Verificar Java
    const info = await checkJava()
    if (!info.installed || !info.compatible) {
      setShowJavaPopup(true)
      return
    }

    // Verificar Forge
    const forgeInfo = await checkForgeVersion()
    if (!forgeInfo.compatible) {
      setShowForgePopup(true)
      return
    }

    // Verificar Mods
    const modsInfo = await checkMods()
    if (countModsNeedingDownload(modsInfo) > 0) {
      setShowModsPopup(true)
      return
    }

    // Todo OK - iniciar juego
    toast.success('¡Todo listo! Iniciando Minecraft...')
    setTimeout(() => {
      window.api.exitApp()
    }, 1000)
  }

  if (isRamLoading) {
    return (
      <div className="h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-xl">Cargando configuración...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        javaInstalled={javaInstalled}
        javaVersion={javaVersion}
        forgeStatus={forgeStatus}
        forgeVersion={forgeVersion}
        modsStatus={modsStatus}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ProgressBar
          isDownloading={isDownloading}
          downloadingItem={downloadingItem}
          progress={progress}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <HomeTab
                  ramAllocation={ramAllocation}
                  news={news}
                  installedMods={modsStatus?.totalInstalled || 'N/A'}
                />
                {modsStatus && (
                  <ModsProgress
                    isDownloading={isDownloading}
                    modsStatus={modsStatus}
                    progress={progress}
                    downloadingMod={downloadingMod}
                    modBlacklist={modBlacklist}
                    updateBlacklist={setModBlacklist}
                    onRefreshMods={checkMods}
                    onToast={toast}
                  />
                )}
              </motion.div>
            )}
            {activeTab === 'news' && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <NewsTab news={news} />
              </motion.div>
            )}
            {activeTab === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <InfoTab
                  modsStatus={modsStatus}
                  modBlacklist={modBlacklist}
                  updateBlacklist={setModBlacklist}
                  onRefreshMods={checkMods}
                  onToast={toast}
                />
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SettingsTab
                  maxRAM={maxRAM}
                  ramAllocation={ramAllocation}
                  setRamAllocation={setRamAllocation}
                  graphicsLevel={graphicsLevel}
                  setGraphicsLevel={setGraphicsLevel}
                  shaderPreset={shaderPreset}
                  setShaderPreset={setShaderPreset}
                  optionalMods={optionalMods}
                  setOptionalMods={setOptionalMods}
                  setShowRepairPopup={setShowRepairPopup}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <PlayButton isDownloading={isDownloading} handlePlay={handlePlay} />
      </div>

      <JavaPopup
        showJavaPopup={showJavaPopup}
        setShowJavaPopup={setShowJavaPopup}
        handleDownloadJava={handleDownloadJava}
      />
      <ForgePopup
        showForgePopup={showForgePopup}
        setShowForgePopup={setShowForgePopup}
        handleDownloadForge={handleDownloadForge}
      />
      <ModsDownloadPopup
        modsStatus={modsStatus}
        onDownload={handleDownloadMods}
        onUpdate={handleUpdateMods}
        onClose={() => setShowModsPopup(false)}
        isDownloading={isDownloading}
        showModsPopup={showModsPopup}
      />
      <RepairPopup
        showRepairPopup={showRepairPopup}
        setShowRepairPopup={setShowRepairPopup}
        handleRepair={handleRepairInstallation}
      />
      <ConfigUpdatePopup
        show={showConfigPopup}
        onUpdate={handleConfigUpdate}
        isUpdating={isConfigUpdating}
      />
      <ToastContainer />
      <UpdateNotification onToast={toast} />
    </div>
  )
}

export default App
