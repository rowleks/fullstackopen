import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <p>{anecdote.content}</p>
      <div>
        <span>
          has <b>{anecdote.votes}</b>{' '}
          {anecdote.votes !== 1 ? 'votes ' : 'vote '}
        </span>
        <button onClick={handleVote}>Vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    } else {
      return anecdotes
    }
  })
  const dispatch = useDispatch()

  const onVote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <Anecdote anecdote={anecdote} handleVote={() => onVote(anecdote)} />
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
