import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_, action) {
      return action.payload
    },
  },
})

const { setAnecdotes, appendAnecdote, addVote } = anecdoteSlice.actions

// Thunks

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdotesService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = content => async dispatch => {
  const newAnecdote = await anecdotesService.create(content)
  dispatch(appendAnecdote(newAnecdote))
}

export const voteAnecdote = id => async (dispatch, getState) => {
  const { anecdotes } = getState()
  const anecdoteToChange = anecdotes.find(a => a.id === id)
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  }
  const updateVote = await anecdotesService.update(id, changedAnecdote)
  dispatch(addVote(updateVote))
}

export default anecdoteSlice.reducer
