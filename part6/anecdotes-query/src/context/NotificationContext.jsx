import { useReducer } from 'react'
import { NotificationContext } from './NotifHook'

const reducer = (state, action) => {
  switch (action.type) {
    case 'NOTIF':
      return { ...state, message: action.payload }
    case 'RESET':
      return { ...state, message: '' }
    default:
      return state
  }
}

const NotifContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { message: '' })

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotifContextProvider
