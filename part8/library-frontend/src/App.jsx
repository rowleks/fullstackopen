import { useState } from 'react'
import { useApolloClient } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import RecommendedBooks from './components/RecommendedBooks'

const Navbar = ({ token, logout }) => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add book</Link>
        <Link to="/recommended-books">recommendations</Link>
        {!token ? (
          <Link to="/login">login</Link>
        ) : (
          <button onClick={logout} className="text-red-500 cursor-pointer">
            logout
          </button>
        )}
      </nav>
    </header>
  )
}

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()
  const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
      <Navbar token={token} logout={logout} />

      <main>
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route path="/recommended-books" element={<RecommendedBooks />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
