import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const Popup = ({ show, onClose, title, icon: Icon, iconColor, children, actions }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      // Small delay for animation
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [show])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div
        className={`bg-gray-800 rounded-xl p-8 max-w-md border border-gray-700 shadow-2xl transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
      >
        <div className={`flex items-center mb-4 ${iconColor}`}>
          {Icon && <Icon className="mr-2" size={24} />}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="text-gray-300 mb-6">{children}</div>
        <div className="flex gap-3">
          {actions}
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

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node
}

Popup.defaultProps = {
  iconColor: 'text-white'
}

export default Popup
