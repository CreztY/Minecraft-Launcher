import { createContext, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    (message, type = 'info', duration = 3000) => {
      const id = Date.now() + Math.random()
      const newToast = { id, message, type, duration }

      setToasts((prev) => [...prev, newToast])

      // Auto-dismiss
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }

      return id
    },
    [removeToast]
  )

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  const value = {
    toasts,
    addToast,
    removeToast,
    clearAll
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider')
  }
  return context
}
