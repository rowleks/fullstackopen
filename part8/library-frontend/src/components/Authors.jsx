import { useQuery } from '@apollo/client/react'
import { ALL_AUTHORS } from '../queries'
import EditAuthor from './EditAuthor'

const AuthorList = ({ authors }) => {
  return (
    <>
      {authors.map(a => (
        <tr key={a.id}>
          <td>{a.name}</td>
          <td>{a.born || '—'}</td>
          <td>{a.bookCount}</td>
        </tr>
      ))}
    </>
  )
}

const Authors = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const authorsData = data.allAuthors || []

  return (
    <div>
      <h2>authors</h2>
      {authorsData.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>YOB</th>
              <th>Books</th>
            </tr>
          </thead>
          <tbody>
            <AuthorList authors={authorsData} />
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center">No authors found</div>
      )}

      <EditAuthor />
    </div>
  )
}

export default Authors
