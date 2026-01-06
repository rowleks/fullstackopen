import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      const token = data?.login?.value
      if (token) {
        setToken(token)
        localStorage.setItem('library-user-token', token)
        navigate('/books')
      }
    },
  })

  const submit = async event => {
    event.preventDefault()

    login(
      { variables: { username, password } },
      {
        onCompleted: () => {
          setUsername('')
        },
      }
    )

    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit} className="space-y-5">
        <label>
          username
          <input
            value={username}
            type="text"
            name="username"
            required
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          password
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
