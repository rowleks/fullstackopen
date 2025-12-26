import { useEffect } from 'react'
import { useNotification } from '../context/NotifHook'

const Notification = () => {
  const {
    state: { message },
    dispatch,
  } = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    if (message) {
      const timeoutID = setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)

      return () => clearTimeout(timeoutID)
    }
  }, [message, dispatch])

  if (!message) {
    return null
  }

  return <div style={style}>{message}</div>
}

export default Notification
