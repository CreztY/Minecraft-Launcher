import PropTypes from 'prop-types'
import { AlertCircle, Download, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'

ModsDownloadPopup.propTypes = {
  modsStatus: PropTypes.object.isRequired,
  onDownload: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  isDownloading: PropTypes.bool.isRequired,
  showModsPopup: PropTypes.bool.isRequired
}

export function ModsDownloadPopup({
  modsStatus,
  onDownload,
  onClose,
  isDownloading,
  showModsPopup
}) {
  const [isVisible, setIsVisible] = useState(false)

  const {
    missing = [],
    modified = [],
    outdated = [],
    corrupted = [],
    totalExpected = 0,
    totalInstalled = 0
  } = modsStatus || {}

  const needsDownload =
    (missing?.length || 0) +
    (modified?.length || 0) +
    (outdated?.length || 0) +
    (corrupted?.length || 0)

  useEffect(() => {
    if (showModsPopup && needsDownload > 0) {
      // Pequeño delay para que la animación se vea
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [showModsPopup, needsDownload])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200) // Esperar a que termine la animación
  }

  if (!showModsPopup || needsDownload === 0) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-yellow-900/30 rounded-lg p-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
          </div>
          <h2 className="text-lg font-bold text-white">Mods Incompletos</h2>
        </div>

        <p className="text-sm text-gray-300 mb-4">
          Se necesitan descargar o actualizar {needsDownload} mod(s) para jugar:
        </p>

        {/* Resumen */}
        <div className="bg-gray-800 rounded-lg p-3 mb-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Instalados:</span>
            <span className="text-green-400">
              {totalInstalled}/{totalExpected}
            </span>
          </div>
          {missing?.length > 0 && (
            <div className="flex justify-between text-gray-300">
              <span>Faltantes:</span>
              <span className="text-blue-400">{missing.length}</span>
            </div>
          )}
          {modified?.length > 0 && (
            <div className="flex justify-between text-gray-300">
              <span>Modificados:</span>
              <span className="text-yellow-400">{modified.length}</span>
            </div>
          )}
          {outdated?.length > 0 && (
            <div className="flex justify-between text-gray-300">
              <span>Desactualizados:</span>
              <span className="text-orange-400">{outdated.length}</span>
            </div>
          )}
        </div>

        {/* Lista de mods a descargar */}
        <div className="bg-gray-800/50 rounded-lg p-3 mb-4 max-h-40 overflow-y-auto">
          <div className="space-y-2 text-xs">
            {missing?.map((mod, idx) => (
              <div key={`missing-${idx}`} className="flex items-center space-x-2 text-gray-300">
                <Download className="w-3 h-3 text-blue-400 shrink-0" />
                <span>
                  {mod.name} (v{mod.version})
                </span>
              </div>
            ))}
            {modified?.map((mod, idx) => (
              <div key={`modified-${idx}`} className="flex items-center space-x-2 text-gray-300">
                <AlertCircle className="w-3 h-3 text-yellow-400 shrink-0" />
                <span>{mod.name} (modificado)</span>
              </div>
            ))}
            {outdated?.map((mod, idx) => (
              <div key={`outdated-${idx}`} className="flex items-center space-x-2 text-gray-300">
                <RefreshCw className="w-3 h-3 text-orange-400 shrink-0" />
                <span>
                  {mod.name} — instalado:{' '}
                  {mod.installedVersion || mod.installedFilename || 'desconocida'} → nueva:{' '}
                  {mod.version}
                </span>
              </div>
            ))}
            {corrupted?.map((mod, idx) => (
              <div key={`corrupted-${idx}`} className="flex items-center space-x-2 text-gray-300">
                <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                <span>
                  {mod.name} — archivo corrupto:{' '}
                  {mod.installedFilename || mod.filename || 'desconocido'} → reemplazar por:{' '}
                  {mod.version || mod.filename}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            disabled={isDownloading}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (!isDownloading) onDownload()
            }}
            disabled={isDownloading}
            className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center space-x-2"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-green-300 border-t-white animate-spin"></div>
                <span>Descargando...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Descargar ({needsDownload})</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Los mods se descargarán en tu directorio ~/.minecraft/mods/
        </p>
      </div>
    </div>
  )
}

export default ModsDownloadPopup
