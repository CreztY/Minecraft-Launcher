import PropTypes from 'prop-types'
import { AlertTriangle, Download } from 'lucide-react'
import { useEffect, useState } from 'react'

ForgePopup.propTypes = {
  showForgePopup: PropTypes.bool.isRequired,
  setShowForgePopup: PropTypes.func.isRequired,
  handleDownloadForge: PropTypes.func.isRequired
}

function ForgePopup({ showForgePopup, setShowForgePopup, handleDownloadForge }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (showForgePopup) {
      // Pequeño delay para que la animación se vea
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [showForgePopup])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(setShowForgePopup(false), 200)
  }

  if (!showForgePopup) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {' '}
      <div className="bg-gray-800 rounded-xl p-8 max-w-md border border-gray-700 shadow-2xl">
        <div className="flex items-center mb-4 text-yellow-400">
          <AlertTriangle className="mr-2" size={24} />
          <h3 className="text-xl font-bold">Forge no detectado o no compatible</h3>
        </div>
        <p className="text-gray-300 mb-6">
          Para jugar con este modpack necesitas tener Forge instalado (versión 1.20.1-forge). Haz
          clic en descargar para obtener la versión recomendada o una versión compatible.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadForge}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center"
          >
            <Download className="mr-2" size={18} />
            Descargar Forge
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgePopup
