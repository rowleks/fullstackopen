const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await fetch(BASE_URL)

  if (!res.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await res.json()
}

const create = async content => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, votes: 0 }),
  }

  const res = await fetch(BASE_URL, options)
  if (!res.ok) {
    throw new Error('Failed to create anecdote')
  }

  return await res.json()
}

export default { getAll, create }
