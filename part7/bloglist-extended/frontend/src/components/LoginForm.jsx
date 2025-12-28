import Notification from './Notification'
import { useField, useLoginResource } from '../hooks'
import { useNotification } from '../context/NotificationContext'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const { login } = useLoginResource()
  const { notification } = useNotification()

  const onLogin = e => {
    e.preventDefault()

    const credentials = {
      username: username.inputProps.value,
      password: password.inputProps.value,
    }

    login(credentials, {
      onSuccess: () => {
        username.reset()
        password.reset()
      },
    })
  }

  return (
    <>
      <div>
        <h1>Log in to the application</h1>
        <Notification />
        {!notification.message && (
          <p className="info">Please login to view your saved blogs</p>
        )}
      </div>
      <form onSubmit={onLogin}>
        <div>
          <label>
            <span>Username: </span>
            <input {...username.inputProps} />
          </label>
        </div>
        <br />

        <div>
          <label>
            <span>Password: </span>
            <input {...password.inputProps} />
          </label>
        </div>
        <br />

        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
