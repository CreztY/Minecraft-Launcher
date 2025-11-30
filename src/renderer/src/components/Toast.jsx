import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
}

const COLORS = {
  success: 'bg-green-600 border-green-500',
  error: 'bg-red-600 border-red-500',
  warning: 'bg-orange-600 border-orange-500',
  info: 'bg-blue-600 border-blue-500'
}

Toast.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func.isRequired
}

function Toast({ id, message, type = 'info', onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = ICONS[type]

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(id), 300)
  }

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg
        transition-all duration-300 transform
        ${COLORS[type]}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      style={{ minWidth: '300px', maxWidth: '400px' }}
    >
      <Icon className="shrink-0 mt-0.5" size={20} />
      <p className="flex-1 text-white text-sm leading-relaxed">{message}</p>
      <button
        onClick={handleClose}
        className="shrink-0 text-white/80 hover:text-white transition-colors"
        aria-label="Cerrar"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Toast
