import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS_AND_GENRES, CREATE_BOOK } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      const addedBook = response.data.addBook

      cache.updateQuery(
        { query: ALL_BOOKS_AND_GENRES, variables: { genre: '' } },
        data => {
          if (!data) return null
          return {
            allBooks: data.allBooks.concat(addedBook),
            allGenres: Array.from(
              new Set(data.allGenres.concat(addedBook.genres))
            ),
          }
        }
      )

      addedBook.genres.forEach(genre => {
        cache.updateQuery(
          { query: ALL_BOOKS_AND_GENRES, variables: { genre } },
          data => {
            if (!data) return null
            return {
              ...data,
              allBooks: data.allBooks.concat(addedBook),
            }
          }
        )
      })

      cache.updateQuery({ query: ALL_AUTHORS }, data => {
        if (!data) return null
        const addedAuthor = addedBook.author
        const exists = data.allAuthors.find(a => a.name === addedAuthor.name)
        return {
          allAuthors: exists
            ? data.allAuthors.map(a =>
                a.name === addedAuthor.name
                  ? { ...a, bookCount: a.bookCount + 1 }
                  : a
              )
            : data.allAuthors.concat({ ...addedAuthor, bookCount: 1 }),
        }
      })
    },
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    },
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
  }

  const addGenre = () => {
    if (!genre) return
    if (genres.includes(genre)) return setGenre('')
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const onGenreKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addGenre()
    }
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
            onKeyDown={onGenreKeyDown}
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
