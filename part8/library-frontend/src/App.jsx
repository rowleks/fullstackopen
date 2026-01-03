import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Routes, Route } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add book</Link>
      </nav>
    </header>
  )
}

const App = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
