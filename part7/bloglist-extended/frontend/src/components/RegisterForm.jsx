import { useField, useUserResources } from '../hooks'
import { useNotification } from '../context/NotificationContext'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const username = useField('text')
  const name = useField('text')
  const password = useField('password')
  const { register } = useUserResources()
  const { notification } = useNotification()
  const navigate = useNavigate()

  const onRegister = e => {
    e.preventDefault()

    const credentials = {
      username: username.inputProps.value,
      name: name.inputProps.value,
      password: password.inputProps.value,
    }

    register(credentials, {
      onSuccess: () => {
        username.reset()
        name.reset()
        password.reset()
        navigate('/')
      },
    })
  }

  return (
    <>
      <div className="space-y-4">
        <h1>Register</h1>
        {!notification.message && (
          <p className="info">Create a new account to use the application</p>
        )}
      </div>
      <form onSubmit={onRegister}>
        <div>
          <label>
            <span>Username: </span>
            <input {...username.inputProps} required />
          </label>
        </div>
        <br />

        <div>
          <label>
            <span>Name: </span>
            <input {...name.inputProps} required />
          </label>
        </div>
        <br />

        <div>
          <label>
            <span>Password: </span>
            <input {...password.inputProps} required />
          </label>
        </div>
        <br />

        <button className="login-btn" type="submit">
          Register
        </button>
      </form>
    </>
  )
}

export default RegisterForm
