import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const submit = async event => {
    event.preventDefault()

    if (!title || !author || !published || genres.length === 0) {
      return
    }

    createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (!genre) return
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit} className="space-y-5">
        <label>
          title
          <input
            value={title}
            type="text"
            name="title"
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label>
          author
          <input
            required
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label>
          published
          <input
            required
            type="number"
            name="published"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </label>
        <label>
          <input
            value={genre}
            type="text"
            name="genre"
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            onClick={addGenre}
            type="button"
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            add genre
          </button>
        </label>
        <label>genres: {genres.join(' ')}</label>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
