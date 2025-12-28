import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/loginService'
import BlogSection from './components/BlogSection'
import { getLoggedUser } from './utils/getLoggedUser'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(getLoggedUser)

  const onLogin = async e => {
    e.preventDefault()
    try {
      const userData = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(userData))
      setUser(userData)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError('Incorrect username or password')
      console.error(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginFormProps = {
    username,
    password,
    setPassword,
    setUsername,
    onLogin,
  }

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError('')
      }, 5000)

      return () => clearTimeout(timeoutId)
    }
  }, [error])

  return (
    <>
      <h1>BlogList</h1>

      <section>
        {!user && (
          <Toggleable buttonLabel="Login">
            <LoginForm {...loginFormProps} error={error} />
          </Toggleable>
        )}
      </section>
      {user && <BlogSection onLogout={handleLogout} />}
    </>
  )
}

export default App
