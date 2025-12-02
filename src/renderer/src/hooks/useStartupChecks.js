import { useState, useCallback } from 'react'

export function useStartupChecks({
  isRamLoading,
  ramAllocation,
  graphicsLevel,
  optionalMods,
  shaderPreset,
  modBlacklist,
  toast
}) {
  const [javaInstalled, setJavaInstalled] = useState(null)
  const [javaVersion, setJavaVersion] = useState(null)
  const [forgeStatus, setForgeStatus] = useState(null)
  const [forgeVersion, setForgeVersion] = useState(null)
  const [modsStatus, setModsStatus] = useState(null)
  const [showJavaPopup, setShowJavaPopup] = useState(false)
  const [showForgePopup, setShowForgePopup] = useState(false)
  const [showModsPopup, setShowModsPopup] = useState(false)
  const [showConfigPopup, setShowConfigPopup] = useState(false)

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

  const checkJava = useCallback(async () => {
    try {
      const javaInfo = await window.api.checkJava()
      setJavaInstalled(Boolean(javaInfo.installed && javaInfo.compatible))
      setJavaVersion(javaInfo.version)

      if (!javaInfo.installed || !javaInfo.compatible) {
        setShowJavaPopup(true)
      }

      return javaInfo
    } catch (error) {
      console.error('Error checking Java:', error)
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
  }, [graphicsLevel, optionalMods, ramAllocation, shaderPreset, modBlacklist, countModsNeedingDownload, toast])

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

  const runStartupChecks = useCallback(async () => {
    if (isRamLoading) return

    try {
      // 1. Verificar Java
      const javaInfo = await checkJava()
      if (!javaInfo.installed || !javaInfo.compatible) {
        console.log('Java check failed or incompatible. Stopping startup sequence.')
        return
      }

      // 2. Verificar Forge (solo si Java está OK)
      const forgeInfo = await checkForgeVersion()
      if (!forgeInfo.compatible) {
        console.log('Forge check failed. Stopping startup sequence.')
        return
      }

      // 3. Verificar Mods (solo si Forge está OK)
      await checkMods()

      // 4. Verificar Config
      await checkConfig()
    } catch (error) {
      console.error('Error en secuencia de inicio:', error)
    }
  }, [isRamLoading, checkJava, checkForgeVersion, checkMods, checkConfig])

  return {
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
    checkConfig,
    runStartupChecks,
    countModsNeedingDownload
  }
}
