import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const BookList = ({ books }) => {
  return (
    <>
      {books.map(a => (
        <tr key={a.id}>
          <td className="max-w-48">{a.title}</td>
          <td>{a.author}</td>
          <td>{a.published}</td>
        </tr>
      ))}
    </>
  )
}

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const booksData = data.allBooks || []

  return (
    <div>
      <h2>books</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          <BookList books={booksData} />
        </tbody>
      </table>
    </div>
  )
}

export default Books
