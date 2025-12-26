import { createContext, useContext } from 'react'

export const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('No context available')
  }
  return context
}
