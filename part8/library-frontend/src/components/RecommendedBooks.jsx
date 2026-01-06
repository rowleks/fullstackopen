import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'
import BookList from './BookList'
import { Link } from 'react-router-dom'

const RecommendedBooks = () => {
  const { data: meData, loading: meLoading } = useQuery(ME)
  const genre = meData?.me?.favoriteGenre

  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if (meLoading || loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const booksData = data?.allBooks || []

  if (!genre) {
    return (
      <div className="flex justify-center">
        <span>
          Please <Link className="text-blue-400">Login</Link> to view
          recommendations
        </span>{' '}
      </div>
    )
  } else if (genre && !booksData.length) {
    return <div className="flex justify-center">No books found</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <span>
        books in your favorite genre: <strong>{genre}</strong>
      </span>

      <table className="my-8">
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

export default RecommendedBooks
