import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/loginService'
import BlogSection from './components/BlogSection'
import Notification from './components/Notification'
import { getLoggedUser } from './utils/getLoggedUser'

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

  if (!user) {
    return (
      <div>
        <h1>Log in to the application</h1>
        {!error && (
          <p className="info">Please login to view your saved blogs</p>
        )}
        <Notification errorMsg={error} />
        <LoginForm {...loginFormProps} />
      </div>
    )
  }

  return (
    <>
      <BlogSection onLogout={handleLogout} />
    </>
  )
}

export default App
