import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import Toggleable from './components/Toggleable'
import { useUser } from './context/UserContext'

const App = () => {
  const { user } = useUser()

  return (
    <>
      <h1>BlogList</h1>

      <section>
        {!user && (
          <Toggleable buttonLabel="Login">
            <LoginForm />
          </Toggleable>
        )}
      </section>
      {user && <BlogSection />}
    </>
  )
}

export default App
