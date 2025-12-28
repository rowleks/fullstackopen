import { useNotification } from '../context/NotificationContext'

const Notification = () => {
  const { notification } = useNotification()

  const getClassName = () => {
    if (notification.type === 'success') return 'success'
    if (notification.type === 'error') return 'error'
    return null
  }

  if (!notification.message) return null

  return (
    <div className={getClassName()}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification
