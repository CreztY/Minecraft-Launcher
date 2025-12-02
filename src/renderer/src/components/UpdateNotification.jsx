import { useState, useEffect } from 'react'
import { Download, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

function UpdateNotification({ onToast }) {
  const [updateStatus, setUpdateStatus] = useState(null) // checking, available, downloading, downloaded, error
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!window.api) return

    // Check for updates on mount ONLY ONCE
    window.api.checkForUpdates()
  }, [])

  useEffect(() => {
    if (!window.api) return

    // Listen for update events
    const removeListener = window.api.onUpdateStatus((data) => {
      console.log('[Update] Status:', data)

      switch (data.status) {
        case 'checking':
          // Optional: show checking indicator
          break
        case 'available':
          setUpdateStatus('available')
          setIsVisible(true)
          if (onToast) onToast('Nueva actualización disponible', { icon: '⬇️' })
          break
        case 'not-available':
          // Optional: log or show toast
          break
        case 'downloading':
          setUpdateStatus('downloading')
          setIsVisible(true)
          setProgress(data.progress?.percent || 0)
          break
        case 'downloaded':
          setUpdateStatus('downloaded')
          setIsVisible(true)
          if (onToast) onToast.success('Actualización lista para instalar')
          break
        case 'error':
          setUpdateStatus('error')
          console.error('[Update] Error:', data.error)
          break
      }
    })

    return () => {
      if (removeListener) removeListener()
    }
  }, [onToast])

  const handleInstall = () => {
    window.api.quitAndInstall()
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-96 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl p-4"
        >
          <div className="flex items-start space-x-4">
            <div className="shrink-0 mt-1">
              {updateStatus === 'available' && (
                <Download className="text-blue-400 animate-bounce" size={24} />
              )}
              {updateStatus === 'downloading' && (
                <RefreshCw className="text-yellow-400 animate-spin" size={24} />
              )}
              {updateStatus === 'downloaded' && (
                <CheckCircle className="text-green-400" size={24} />
              )}
              {updateStatus === 'error' && <AlertCircle className="text-red-400" size={24} />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white mb-1">
                {updateStatus === 'available' && 'Actualización Disponible'}
                {updateStatus === 'downloading' && 'Descargando Actualización...'}
                {updateStatus === 'downloaded' && 'Actualización Lista'}
                {updateStatus === 'error' && 'Error de Actualización'}
              </h4>

              <p className="text-xs text-gray-400 mb-3">
                {updateStatus === 'available' &&
                  'Una nueva versión se está descargando en segundo plano.'}
                {updateStatus === 'downloading' && `${progress.toFixed(1)}% completado`}
                {updateStatus === 'downloaded' && 'Reinicia ahora para aplicar los cambios.'}
                {updateStatus === 'error' && 'Ocurrió un problema al intentar actualizar.'}
              </p>

              {updateStatus === 'downloading' && (
                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}

              <div className="flex space-x-2">
                {updateStatus === 'downloaded' && (
                  <button
                    onClick={handleInstall}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1.5 px-3 rounded transition-colors"
                  >
                    Reiniciar y Actualizar
                  </button>
                )}
                <button
                  onClick={handleDismiss}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-bold py-1.5 px-3 rounded transition-colors"
                >
                  {updateStatus === 'downloaded' ? 'Más tarde' : 'Ocultar'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

UpdateNotification.propTypes = {
  onToast: PropTypes.func
}

export default UpdateNotification
