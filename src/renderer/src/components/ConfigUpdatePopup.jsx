import PropTypes from 'prop-types'
import { Download, Settings, X } from 'lucide-react'

ConfigUpdatePopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired
}

export function ConfigUpdatePopup({ show, onUpdate, onCancel, isUpdating }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-900/30 rounded-lg p-2">
            <Settings className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-lg font-bold text-white">Actualización de Configuración</h2>
        </div>

        <p className="text-sm text-gray-300 mb-6">
          Hay una nueva versión de la configuración del cliente (FancyMenu, opciones, etc.). Es
          necesario actualizar para asegurar la compatibilidad con el servidor.
        </p>

        <div className="flex flex-col space-y-2">
          <button
            onClick={onUpdate}
            disabled={isUpdating}
            className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center space-x-2"
          >
            {isUpdating ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-blue-300 border-t-white animate-spin"></div>
                <span>Actualizando...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Actualizar Configuración</span>
              </>
            )}
          </button>

          <button
            onClick={onCancel}
            disabled={isUpdating}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Cancelar (hasta reiniciar)</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfigUpdatePopup
