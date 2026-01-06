import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const BookList = ({ books }) => {
  return (
    <>
      {books.map(b => (
        <tr key={b.id}>
          <td className="max-w-48">{b.title}</td>
          <td>{b.author.name}</td>
          <td>{b.published}</td>
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

  if (!booksData.length) {
    return <div className="flex justify-center">No books found</div>
  }

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
