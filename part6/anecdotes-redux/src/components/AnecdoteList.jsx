import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <p>{anecdote.content}</p>
      <div>
        <span>
          has {anecdote.votes} {anecdote.votes !== 1 ? 'votes ' : 'vote '}
        </span>
        <button onClick={handleVote}>Vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <Anecdote
              anecdote={anecdote}
              handleVote={() => dispatch(voteAnecdote(anecdote.id))}
            />
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
