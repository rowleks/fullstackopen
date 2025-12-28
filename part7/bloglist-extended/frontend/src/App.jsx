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
import { useUserResources } from './hooks'

const HomePage = ({ user }) => {
  return (
    <>
      <div>
        <h1>BlogList</h1>
        {!user && (
          <Toggleable buttonLabel="Login">
            <LoginForm />
          </Toggleable>
        )}
      </div>
    </>
  )
}

const Nav = () => {
  const padding = {
    padding: 10,
  }
  return (
    <>
      <nav className="p-3 bg-gray-200">
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </nav>
    </>
  )
}

const ProtectedRoutes = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/" replace />
}

const App = () => {
  const { user: loggedUser } = useUser()
  const users = useUserResources()
  const match = useMatch('/users/:id')

  if (!users) return null

  const matchedUser =
    match && users.data ? users.data.find(u => u.id === match.params.id) : null

  return (
    <div className="container mx-auto space-y-8">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage user={loggedUser} />} />
        <Route element={<ProtectedRoutes user={loggedUser} />}>
          <Route
            path="/users/:id"
            element={<UserDetails user={matchedUser} />}
          />
          <Route path="/users" element={<UsersSection />} />
          <Route path="/blogs" element={<BlogSection />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
