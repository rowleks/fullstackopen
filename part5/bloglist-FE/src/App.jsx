import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/loginService'
import BlogSection from './components/BlogSection'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState({ error: '', success: '' })
  const [user, setUser] = useState(null)

  const onLogin = async e => {
    e.preventDefault()
    try {
      const userData = await loginService.login({ username, password })
      setUser(userData)
      setUsername('')
      setPassword('')
    } catch (e) {
      setMsg({ error: 'Incorrect username or password', success: '' })
      console.error(e)
    }
  }

  const handleLogout = () => {
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
    if (msg.success || msg.error) {
      const timeoutId = setTimeout(() => {
        setMsg({ error: '', success: '' })
      }, 5000)

      return () => clearTimeout(timeoutId)
    }
  }, [msg.success, msg.error])

  if (!user) {
    return <LoginForm {...loginFormProps} />
  }

  return (
    <>
      <BlogSection username={user.user.username} onLogout={handleLogout} />
    </>
  )
}

export default App
