import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS_AND_GENRES } from '../queries'
import { useState } from 'react'
import BookList from './BookList'

const Filter = ({ genres, setGenre, activeGenre }) => {
  return (
    <>
      <div className="flex items-center gap-1.5 my-5">
        {genres.map(genre => (
          <button
            className={`px-3 py-1 rounded-3xl cursor-pointer ${
              activeGenre === genre ? 'bg-blue-300' : 'bg-gray-300'
            }`}
            key={genre}
            onClick={() => setGenre(genre)}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => setGenre('')}
          className={`px-3 py-1 rounded-3xl cursor-pointer ${
            !activeGenre ? 'bg-blue-300' : 'bg-gray-300'
          }`}
        >
          all
        </button>
      </div>
    </>
  )
}

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const { loading, error, data } = useQuery(ALL_BOOKS_AND_GENRES, {
    variables: { genre: selectedGenre || '' },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const booksData = data.allBooks || []
  const genres = data.allGenres || []

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
      <Filter
        genres={genres}
        setGenre={setSelectedGenre}
        activeGenre={selectedGenre}
      />
    </div>
  )
}

export default Books
