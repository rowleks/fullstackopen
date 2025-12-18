const LoginForm = ({
  username,
  password,
  onLogin,
  setUsername,
  setPassword,
}) => {
  return (
    <>
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

        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
