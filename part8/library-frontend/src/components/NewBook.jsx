import { useState } from 'react'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const submit = async event => {
    event.preventDefault()

    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit} className="space-y-8">
        <label>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </label>
        <label>
          <input
            value={genre}
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
