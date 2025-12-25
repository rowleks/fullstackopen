import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotesService'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdote = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: newAnecdote => {
      queryClient.setQueryData(['anecdotes'], state =>
        state ? state.concat(newAnecdote) : state
      )
    },
  })
  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote.mutate(content)
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
