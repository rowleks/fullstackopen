import { useContext, createContext, useReducer } from 'react'

/* eslint-disable react-refresh/only-export-components */

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('No context available')
  }
  return context
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return { message: '', type: null }
    default:
      return state
  }
}

const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, {
    message: '',
    type: null,
  })

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider
