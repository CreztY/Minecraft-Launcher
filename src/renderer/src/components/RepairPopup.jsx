import PropTypes from 'prop-types'
import { AlertTriangle, Hammer } from 'lucide-react'
import { useEffect, useState } from 'react'

RepairPopup.propTypes = {
  showRepairPopup: PropTypes.bool.isRequired,
  setShowRepairPopup: PropTypes.func.isRequired,
  handleRepair: PropTypes.func.isRequired
}

function RepairPopup({ showRepairPopup, setShowRepairPopup, handleRepair }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (showRepairPopup) {
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [showRepairPopup])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(setShowRepairPopup(false), 200)
  }

  const handleAccept = () => {
    setIsVisible(false)
    setTimeout(setShowRepairPopup(false), 200)
    handleRepair()
  }

  if (!showRepairPopup) {
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
          <AlertTriangle className="mr-2" size={24} />
          <h3 className="text-xl font-bold">Reparar minecraft</h3>
        </div>
        <p className="text-gray-300 mb-6">¿Está seguro de que desea reparar minecraft?</p>
        <p className="text-gray-300 mb-6">
          Al reparar minecraft se eliminarán todos estos archivos.
        </p>
        <ul className="flex flex-col list-disc text-gray-300 pl-5 mb-6">
          <li>Archivos de modpack</li>
          <li>Archivos de Forge</li>
          <li>Archivos de mods</li>
          <li>Archivos de shadders</li>
          <li>Archivos de versiones</li>
        </ul>
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center"
          >
            <Hammer className="mr-2" size={18} />
            Reparar minecraft
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

export default RepairPopup
