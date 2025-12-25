import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setAddNotif } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotesService'

const AnectdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdotesService.create(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setAddNotif(newAnecdote.content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnectdoteForm
