import { useEffect, useState } from 'react'
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
import ModsDownloadPopup from './components/ModsDownloadPopup'
import { FORGE_DOWNLOAD_URL, NEXTCLOUD_SHARE, NEWS } from '../../config'

function App() {
  const maxMods = 24
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

  // Configuración
  const [ramAllocation, setRamAllocation] = useState(12)
  const [maxRAM, setMaxRAM] = useState(32)
  const [graphicsLevel, setGraphicsLevel] = useState('normal')
  const [optionalMods, setOptionalMods] = useState({
    shaders: true,
    modpack: true,
    minimap: true,
    map: true
  })
  const [isRamLoading, setIsRamLoading] = useState(true)

  // Noticias desde configuración
  const [news] = useState(NEWS)

  const checkJava = async () => {
    try {
      // Llamada segura al main process expuesta por preload
      const javaInfo = await window.api.checkJava()
      setJavaInstalled(Boolean(javaInfo.installed && javaInfo.compatible))
      setJavaVersion(javaInfo.version)
      // console.log('Java Info:', javaInfo)

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
  }

  const checkForgeVersion = async () => {
    try {
      const forgeInfo = await window.api.checkForgeVersion()
      setForgeStatus(forgeInfo.status)
      setForgeVersion(forgeInfo.version)
      // console.log('Forge Info:', forgeInfo)

      // Mostrar popup si no está instalado o no es compatible
      if (!forgeInfo.compatible) {
        setShowForgePopup(true)
      } else {
        setShowForgePopup(false)
      }

      return forgeInfo
    } catch (error) {
      console.error('Error checking Forge:', error)
      return { status: 'notInstalled', compatible: false }
    }
  }

  const checkMods = async () => {
    try {
      const settings = {
        graphicsLevel,
        optionalMods,
        ramAllocation
      }
      const modsInfo = await window.api.checkMods(settings)
      setModsStatus(modsInfo)
      console.log('Mods Info:', modsInfo)

      // Mostrar popup si hay mods faltantes, modificados, desactualizados o corruptos
      const needsDownload =
        (modsInfo.missing?.length || 0) +
        (modsInfo.modified?.length || 0) +
        (modsInfo.outdated?.length || 0) +
        (modsInfo.corrupted?.length || 0)
      if (needsDownload > 0) {
        setShowModsPopup(true)
      }

      return modsInfo
    } catch (error) {
      console.error('Error checking mods:', error)
      setModsStatus(null)
      return null
    }
  }

  useEffect(() => {
    if (isRamLoading) return

    const timer = setTimeout(async () => {
      try {
        await Promise.all([checkJava(), checkForgeVersion(), checkMods()])
      } catch (error) {
        console.error('Error en escaneo automático:', error)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isRamLoading])

  // Escuchar eventos de progreso de descarga de mods enviados por el main
  useEffect(() => {
    if (!window.api || !window.api.onModsDownloadProgress) return

    const off = window.api.onModsDownloadProgress((data) => {
      if (data.type === 'start') {
        setDownloadingMod({ id: data.id, filename: data.filename })
        setProgress(0)
      } else if (data.type === 'progress') {
        setProgress(Math.round(data.percent || 0))
      } else if (data.type === 'complete') {
        if (data.ok) {
          setProgress(100)
        } else {
          console.error('Download failed for', data.filename, data.error)
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
        checkMods()
        setTimeout(() => setProgress(0), 1200)
      }
    })

    return () => {
      if (typeof off === 'function') off()
    }
  }, [])

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
      const settings = {
        maxRAM, // 4. IMPORTANTE: Guardar también maxRAM
        ramAllocation,
        graphicsLevel,
        optionalMods
      }
      console.log('Saving settings:', settings)
      window.api.saveSettings(settings)
    }
  }, [ramAllocation, graphicsLevel, optionalMods, maxRAM, isRamLoading])

  // Función para simular descarga
  const simulateDownload = (item, duration = 3000) => {
    setIsDownloading(true)
    setDownloadingItem(item)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          return 100
        }
        return prev + 100 / (duration / 100)
      })
    }, 100)
  }

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

  const handleDownloadMods = async () => {
    if (!modsStatus) return
    const { missing = [], modified = [], outdated = [], corrupted = [] } = modsStatus
    const toProcess = [...missing, ...modified, ...outdated, ...corrupted]
    if (toProcess.length === 0) {
      setShowModsPopup(false)
      return
    }

    // Preparar payload con posibles oldFilename para outdated/corrupted
    const payload = toProcess.map((m) => ({
      id: m.id,
      filename: m.filename,
      oldFilename: m.installedFilename || null,
      installType: m.installType || 'mods'
    }))

    setShowModsPopup(false)
    setIsDownloading(true)
    setDownloadingItem('Actualizando/Descargando mods')

    try {
      // Usar updateMods que borra antiguos si se pasan oldFilename y luego descarga
      await window.api.updateMods(NEXTCLOUD_SHARE, payload)
    } catch (error) {
      console.error('Error downloading/updating mods:', error)
      setIsDownloading(false)
      setDownloadingMod(null)
    }
  }

  const handleUpdateMods = async () => {
    if (!modsStatus) return

    const { outdated = [], corrupted = [] } = modsStatus
    const toUpdate = [...outdated, ...corrupted]
    if (toUpdate.length === 0) {
      setShowModsPopup(false)
      return
    }

    // Preparar payload: incluir old filename y nueva filename para outdated + corrupted
    const payload = toUpdate.map((m) => ({
      id: m.id,
      filename: m.filename, // nueva recomendada
      oldFilename: m.installedFilename || m.filename || null,
      installType: m.installType || 'mods'
    }))

    setShowModsPopup(false)
    setIsDownloading(true)
    setDownloadingItem('Actualizando mods')

    try {
      await window.api.updateMods(NEXTCLOUD_SHARE, payload)
      // El progreso y la finalización se gestionan por eventos desde el main
    } catch (error) {
      console.error('Error updating mods:', error)
      setIsDownloading(false)
    }
  }

  const handleRepairInstallation = () => {
    if (
      confirm(
        '¿Estás seguro de que quieres reparar la instalación? Esto volverá a descargar todos los archivos.'
      )
    ) {
      simulateDownload('Reparando instalación', 5000)
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
    // console.log('Forge Info on Play:', forgeInfo)
    if (!forgeInfo.compatible) {
      setShowForgePopup(true)
      return
    }

    // Verificar Mods
    const modsInfo = await checkMods()
    const needsDownload =
      (modsInfo?.missing?.length || 0) +
      (modsInfo?.modified?.length || 0) +
      (modsInfo?.outdated?.length || 0) +
      (modsInfo?.corrupted?.length || 0)
    if (needsDownload > 0) {
      setShowModsPopup(true)
      return
    }

    // Todo OK - iniciar juego
    if (confirm('Ya esta todo listo. Ahora inicia el juego y comienza el juego!')) {
      // Cerrar la app
      window.api.exitApp()
    }
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
        maxMods={maxMods}
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
          {activeTab === 'home' && (
            <div className="space-y-6">
              <HomeTab
                ramAllocation={ramAllocation}
                news={news}
                istalledMods={modsStatus?.totalInstalled || 'N/A'}
              />
              {modsStatus && (
                <ModsProgress
                  isDownloading={isDownloading}
                  modsStatus={modsStatus}
                  progress={progress}
                  downloadingMod={downloadingMod}
                />
              )}
            </div>
          )}
          {activeTab === 'news' && <NewsTab news={news} />}
          {activeTab === 'info' && <InfoTab />}
          {activeTab === 'settings' && (
            <SettingsTab
              maxRAM={maxRAM}
              ramAllocation={ramAllocation}
              setRamAllocation={setRamAllocation}
              graphicsLevel={graphicsLevel}
              setGraphicsLevel={setGraphicsLevel}
              optionalMods={optionalMods}
              setOptionalMods={setOptionalMods}
              handleRepairInstallation={handleRepairInstallation}
            />
          )}
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
    </div>
  )
}

export default App
