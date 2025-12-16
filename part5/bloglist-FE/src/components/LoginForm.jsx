const LoginForm = ({
  username,
  password,
  onLogin,
  setUsername,
  setPassword,
}) => {
  return (
    <div>
      <h1>Log in to the application</h1>

      <form onSubmit={onLogin}>
        <div>
          <label>
            <span>Username: </span>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
        </div>
        <br />

        <div>
          <label>
            <span>Password: </span>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
