import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { AlertCircle, Download } from 'lucide-react'

JavaPopup.propTypes = {
  showJavaPopup: PropTypes.bool.isRequired,
  setShowJavaPopup: PropTypes.func.isRequired,
  handleDownloadJava: PropTypes.func.isRequired
}

function JavaPopup({ showJavaPopup, setShowJavaPopup, handleDownloadJava }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (showJavaPopup) {
      // Pequeño delay para que la animación se vea
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [showJavaPopup])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(setShowJavaPopup(false), 200)
  }

  if (!showJavaPopup) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-gray-800 rounded-xl p-8 max-w-md border border-gray-700 shadow-2xl">
        <div className="flex items-center mb-4 text-yellow-400">
          <AlertCircle className="mr-2" size={24} />
          <h3 className="text-xl font-bold">Java no detectado</h3>
        </div>
        <p className="text-gray-300 mb-6">
          Para jugar necesitas tener Java instalado en tu sistema. Haz clic en descargar para
          obtener la última versión.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadJava}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center"
          >
            <Download className="mr-2" size={18} />
            Descargar Java
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

export default JavaPopup
