import { useState } from 'react'
import LoginForm from './components/LoginForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const onLogin = e => {
    e.preventDefault()
    console.log('logged in')
    setUser(true)
  }

  const loginFormProps = {
    username,
    password,
    setPassword,
    setUsername,
    onLogin,
  }

  return (
    <>
      <div>{!user && <LoginForm {...loginFormProps} />}</div>
    </>
  )
}

export default App
