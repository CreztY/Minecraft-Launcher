import { useEffect, useState } from 'react'
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
import { useStartupChecks } from './hooks/useStartupChecks'
import { useModsDownload } from './hooks/useModsDownload'
import { FORGE_DOWNLOAD_URL, MODS_SHARE, NEWS } from '../../config'

function App() {
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('home')
  const [showRepairPopup, setShowRepairPopup] = useState(false)
  const [isConfigUpdating, setIsConfigUpdating] = useState(false)
  const [configUpdateCancelled, setConfigUpdateCancelled] = useState(false)

  // Configuración
  const [ramAllocation, setRamAllocation] = useState(12)
  const [maxRAM, setMaxRAM] = useState(32)
  const [graphicsLevel, setGraphicsLevel] = useState('normal')
  const [shaderPreset, setShaderPreset] = useState('high')
  const [optionalMods, setOptionalMods] = useState({
    shaders: false,
    modpack: false,
    minimap: true,
    map: true
  })
  const [modBlacklist, setModBlacklist] = useState([])
  const [isRamLoading, setIsRamLoading] = useState(true)

  // Noticias desde configuración
  const [news] = useState(NEWS)

  // Custom Hooks
  const {
    javaInstalled,
    javaVersion,
    forgeStatus,
    forgeVersion,
    modsStatus,
    showJavaPopup,
    setShowJavaPopup,
    showForgePopup,
    setShowForgePopup,
    showModsPopup,
    setShowModsPopup,
    showConfigPopup,
    setShowConfigPopup,
    checkJava,
    checkForgeVersion,
    checkMods,
    runStartupChecks,
    countModsNeedingDownload
  } = useStartupChecks({
    isRamLoading,
    ramAllocation,
    graphicsLevel,
    optionalMods,
    shaderPreset,
    modBlacklist,
    toast
  })

  const {
    progress,
    setProgress,
    isDownloading,
    setIsDownloading,
    downloadingItem,
    setDownloadingItem,
    downloadingMod,
    handleModsDownload,
    getModsToProcess,
    prepareModsPayload
  } = useModsDownload({
    modsStatus,
    checkMods,
    setShowModsPopup,
    toast
  })

  // Secuencia de inicio
  useEffect(() => {
    const timer = setTimeout(runStartupChecks, 500)
    return () => clearTimeout(timer)
  }, [runStartupChecks])

  // Escuchar eventos de actualización de configuración
  useEffect(() => {
    if (!window.api || !window.api.onConfigUpdateProgress) return

    const off = window.api.onConfigUpdateProgress((data) => {
      if (data.type === 'start') {
        setIsConfigUpdating(true)
      } else if (data.type === 'done') {
        setIsConfigUpdating(false)
        setShowConfigPopup(false)
        setConfigUpdateCancelled(false)
        toast.success('Configuración actualizada correctamente')
      } else if (data.type === 'error') {
        setIsConfigUpdating(false)
        toast.error(`Error al actualizar configuración: ${data.error}`)
      }
    })

    return () => {
      if (typeof off === 'function') off()
    }
  }, [toast, setShowConfigPopup])

  // Cargar configuración inicial
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await window.api.getSettings()
        const systemRAM = await window.api.getSystemRAM()
        setMaxRAM(systemRAM)

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
          const defaultRAM = Math.min(12, systemRAM)
          setRamAllocation(defaultRAM)
        }
      } catch (error) {
        console.error('Error al cargar configuración:', error)
        const systemRAM = 16
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
      }, 500)

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
    try {
      await window.api.openExternal('https://www.java.com/es/download/manual.jsp')
    } catch (e) {
      console.error('openExternal failed', e)
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

  const handleUpdateMods = () => handleModsDownload(true)
  const handleDownloadMods = () => handleModsDownload(false)

  const handleRepairInstallation = async () => {
    try {
      setIsDownloading(true)
      setDownloadingItem('Reparando instalación...')
      setProgress(0)
      setShowRepairPopup(false)

      await window.api.repairInstallation()
      await checkForgeVersion()

      const modsInfo = await checkMods()

      if (modsInfo) {
        const toProcess = getModsToProcess(modsInfo)
        if (toProcess.length > 0) {
          setDownloadingItem('Descargando mods...')
          const payload = prepareModsPayload(toProcess, true)
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

  const handleCancelConfigUpdate = () => {
    setConfigUpdateCancelled(true)
    setShowConfigPopup(false)
    toast.info('Actualización cancelada. Se volverá a solicitar al reiniciar la app.')
  }

  const handlePlay = async () => {
    const info = await checkJava()
    if (!info.installed || !info.compatible) {
      setShowJavaPopup(true)
      return
    }

    const forgeInfo = await checkForgeVersion()
    if (!forgeInfo.compatible) {
      setShowForgePopup(true)
      return
    }

    const modsInfo = await checkMods()
    if (countModsNeedingDownload(modsInfo) > 0) {
      setShowModsPopup(true)
      return
    }

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
        show={showConfigPopup && !configUpdateCancelled}
        onUpdate={handleConfigUpdate}
        onCancel={handleCancelConfigUpdate}
        isUpdating={isConfigUpdating}
      />
      <ToastContainer />
      <UpdateNotification onToast={toast} />
    </div>
  )
}

export default App
