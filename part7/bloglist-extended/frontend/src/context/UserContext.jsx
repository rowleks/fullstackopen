import { useReducer, createContext, useContext } from 'react'
import { getLoggedUser } from '../utils/getLoggedUser'

/* eslint-disable react-refresh/only-export-components */

export const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('No context available')
  }
  return context
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem('loggedUser', JSON.stringify(action.payload))
      return action.payload

    case 'LOGOUT':
      window.localStorage.removeItem('loggedUser')
      return null

    default:
      return state
  }
}

const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, null, getLoggedUser)

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
