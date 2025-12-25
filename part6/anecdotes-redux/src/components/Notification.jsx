import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetNotif } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification.vote || notification.add) {
      const timeoutId = setTimeout(() => {
        dispatch(resetNotif())
      }, 5000)
      return () => clearTimeout(timeoutId)
    }
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  if (!notification.vote && !notification.add) {
    return null
  }

  return (
    <>
      {notification.vote && (
        <div style={style}>{`You voted '${notification.vote}'`}</div>
      )}
      {notification.add && (
        <div style={style}>{`You added '${notification.add}'`}</div>
      )}
    </>
  )
}

export default Notification
