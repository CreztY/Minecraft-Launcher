import { useState, useCallback, useEffect } from 'react'
import { MODS_SHARE } from '../../../config'

export function useModsDownload({ modsStatus, checkMods, setShowModsPopup, toast }) {
  const [progress, setProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadingItem, setDownloadingItem] = useState('')
  const [downloadingMod, setDownloadingMod] = useState(null)

  // Escuchar eventos de progreso de descarga de mods enviados por el main
  useEffect(() => {
    if (!window.api || !window.api.onModsDownloadProgress) return

    const off = window.api.onModsDownloadProgress((data) => {
      if (data.type === 'start') {
        setDownloadingMod({ id: data.id, filename: data.filename })
        const current = data.current || 1
        const total = data.total || 1
        const baseProgress = ((current - 1) / total) * 100
        setProgress(baseProgress)
        setDownloadingItem(`Descargando ${data.filename} (${current}/${total})`)
      } else if (data.type === 'progress') {
        const current = data.current || 1
        const total = data.total || 1
        const baseProgress = ((current - 1) / total) * 100
        const fileProgress = (data.percent || 0) / total
        setProgress(Math.min(99, baseProgress + fileProgress))
      } else if (data.type === 'complete') {
        if (data.ok) {
          const current = data.current || 1
          const total = data.total || 1
          const progress = (current / total) * 100
          setProgress(progress)
        } else {
          console.error('Download failed for', data.filename, data.error)
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
  }, [toast])

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

    const itemsToDelete = toProcess.filter((m) => m.reason === 'disabled_in_settings')
    const itemsToDownload = toProcess.filter((m) => m.reason !== 'disabled_in_settings')

    const payload = prepareModsPayload(itemsToDownload)
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

      setTimeout(async () => {
        console.log('Verificando mods tras descarga...')
        const newStatus = await checkMods()
        // Note: countModsNeedingDownload logic is duplicated here slightly or needs to be passed
        // For now, we rely on the toast message
        if (newStatus && (
            (newStatus.missing?.length || 0) +
            (newStatus.modified?.length || 0) +
            (newStatus.outdated?.length || 0) +
            (newStatus.corrupted?.length || 0) +
            (newStatus.unused?.length || 0)
          ) === 0) {
          toast.success('Todos los mods están sincronizados correctamente')
        } else {
          toast.warning('Algunos mods aún requieren atención')
        }
      }, 1000)
    } catch (error) {
      console.error('Error downloading/updating mods:', error)
      toast.error('Error al descargar/actualizar mods')
      setIsDownloading(false)
      setDownloadingMod(null)
    }
  }

  return {
    progress,
    setProgress,
    isDownloading,
    setIsDownloading,
    downloadingItem,
    setDownloadingItem,
    downloadingMod,
    setDownloadingMod,
    handleModsDownload,
    getModsToProcess,
    prepareModsPayload
  }
}
