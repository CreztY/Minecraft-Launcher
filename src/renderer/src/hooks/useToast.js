import { useCallback, useMemo } from 'react'
import { useToastContext } from '../contexts/ToastContext'

export function useToast() {
  const { addToast } = useToastContext()

  const success = useCallback(
    (message) => {
      return addToast(message, 'success', 3000)
    },
    [addToast]
  )

  const error = useCallback(
    (message) => {
      return addToast(message, 'error', 5000)
    },
    [addToast]
  )

  const warning = useCallback(
    (message) => {
      return addToast(message, 'warning', 4000)
    },
    [addToast]
  )

  const info = useCallback(
    (message) => {
      return addToast(message, 'info', 3000)
    },
    [addToast]
  )

  return useMemo(() => ({ success, error, warning, info }), [success, error, warning, info])
}
