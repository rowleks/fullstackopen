import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotesService'
import { useNotification } from '../context/NotifHook'

const AnecdoteForm = () => {
  const { dispatch } = useNotification()
  const queryClient = useQueryClient()

  const createAnecdote = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: newAnecdote => {
      queryClient.setQueryData(['anecdotes'], state =>
        state ? state.concat(newAnecdote) : state
      )
      dispatch({
        type: 'NOTIF',
        payload: `you created '${newAnecdote.content}'`,
      })
    },
    onError: error => {
      dispatch({ type: 'NOTIF', payload: error.message })
    },
  })
  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote.mutate(content, )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
