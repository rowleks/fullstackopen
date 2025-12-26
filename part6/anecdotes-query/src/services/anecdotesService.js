const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await fetch(BASE_URL)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
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
    const errorData = await res.json()
    throw new Error(errorData.error)
  }

  return await res.json()
}

const update = async newObject => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObject),
  }

  const res = await fetch(`${BASE_URL}/${newObject.id}`, options)
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error)
  }

  return await res.json()
}

export default { getAll, create, update }
