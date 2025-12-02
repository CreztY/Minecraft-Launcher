import PropTypes from 'prop-types'
import { AlertCircle, Download } from 'lucide-react'
import Popup from './Popup'

JavaPopup.propTypes = {
  showJavaPopup: PropTypes.bool.isRequired,
  setShowJavaPopup: PropTypes.func.isRequired,
  handleDownloadJava: PropTypes.func.isRequired
}

function JavaPopup({ showJavaPopup, setShowJavaPopup, handleDownloadJava }) {
  return (
    <Popup
      show={showJavaPopup}
      onClose={() => setShowJavaPopup(false)}
      title="Java no detectado"
      icon={AlertCircle}
      iconColor="text-yellow-400"
      actions={
        <button
          onClick={handleDownloadJava}
          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center"
        >
          <Download className="mr-2" size={18} />
          Descargar Java
        </button>
      }
    >
      <p>
        Para jugar necesitas tener Java instalado en tu sistema. Haz clic en descargar para obtener la
        última versión.
      </p>
    </Popup>
  )
}

export default JavaPopup
