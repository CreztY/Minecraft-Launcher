import PropTypes from 'prop-types'
import { AlertTriangle, Download } from 'lucide-react'
import Popup from './Popup'

ForgePopup.propTypes = {
  showForgePopup: PropTypes.bool.isRequired,
  setShowForgePopup: PropTypes.func.isRequired,
  handleDownloadForge: PropTypes.func.isRequired
}

function ForgePopup({ showForgePopup, setShowForgePopup, handleDownloadForge }) {
  return (
    <Popup
      show={showForgePopup}
      onClose={() => setShowForgePopup(false)}
      title="Forge no detectado o no compatible"
      icon={AlertTriangle}
      iconColor="text-yellow-400"
      actions={
        <button
          onClick={handleDownloadForge}
          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center"
        >
          <Download className="mr-2" size={18} />
          Descargar Forge
        </button>
      }
    >
      <p>
        Para jugar con este modpack necesitas tener Forge instalado (versión 1.20.1-forge). Haz clic
        en descargar para obtener la versión recomendada o una versión compatible.
      </p>
    </Popup>
  )
}

export default ForgePopup
