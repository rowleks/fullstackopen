import {
  Routes,
  Route,
  Link,
  useMatch,
  Navigate,
  Outlet,
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import UsersSection from './components/UsersSection'
import UserDetails from './components/UserDetails'
import Toggleable from './components/Toggleable'
import { useUser } from './context/UserContext'
import { useBlogResource, useUserResources } from './hooks'
import BlogDetails from './components/BlogDetails'
import Notification from './components/Notification'
import RegisterForm from './components/RegisterForm'

const HomePage = ({ user }) => {
  if (user) {
    return <Navigate to="/blogs" replace />
  }
  return (
    <>
      <div>
        {!user && (
          <Toggleable buttonLabel="Login">
            <LoginForm />
          </Toggleable>
        )}
      </div>
    </>
  )
}

const Nav = ({ loggedUser, dispatch }) => {
  const username = loggedUser ? loggedUser.user.username : ''
  return (
    <>
      <header className="flex items-center justify-between p-3 bg-gray-200">
        <nav>
          <Link className="p-2" to="/blogs">
            blogs
          </Link>
          <Link className="p-2" to="/users">
            users
          </Link>
          {!loggedUser && <Link to="/register">register</Link>}
        </nav>
        {loggedUser && (
          <div>
            Welcome <b>{username} </b>
            <button
              className="logout-btn"
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              Logout
            </button>
          </div>
        )}
      </header>
    </>
  )
}

const ProtectedRoutes = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/" replace />
}

const App = () => {
  const { user: loggedUser, dispatch } = useUser()
  const { users } = useUserResources()
  const [blogs, _] = useBlogResource()
  const match = useMatch('/users/:id')
  const found = useMatch('/blogs/:id')

  const matchedBlog =
    found && blogs.data ? blogs.data.find(b => b.id === found.params.id) : null
  const matchedUser =
    match && users.data ? users.data.find(u => u.id === match.params.id) : null

  return (
    <div className="container mx-auto space-y-8">
      <Nav loggedUser={loggedUser} dispatch={dispatch} />

      <h1>BlogList</h1>
      <Notification />
      <div className="px-3">
        <Routes>
          <Route path="/" element={<HomePage user={loggedUser} />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route element={<ProtectedRoutes user={loggedUser} />}>
            <Route
              path="/users/:id"
              element={<UserDetails user={matchedUser} />}
            />
            <Route
              path="/blogs/:id"
              element={<BlogDetails blog={matchedBlog} />}
            />
            <Route path="/users" element={<UsersSection />} />
            <Route path="/blogs" element={<BlogSection />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
