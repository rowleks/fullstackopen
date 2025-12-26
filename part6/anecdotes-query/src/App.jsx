import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotesService'
import { useNotification } from './context/NotifHook'

const App = () => {
  const { dispatch } = useNotification()
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: 1,
  })

  const addVote = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: updatedAnecdote => {
      queryClient.setQueryData(['anecdotes'], state =>
        state.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
    },
  })

  const handleVote = anecdote => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    addVote.mutate(updatedAnecdote)
    dispatch({ type: 'NOTIF', payload: `you voted '${anecdote.content}'` })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Anecdote service not available due to server problems</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.slice().sort((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
