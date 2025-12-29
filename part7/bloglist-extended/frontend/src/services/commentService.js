import axios from 'axios'

let token

const setToken = jwtToken => {
  token = `Bearer ${jwtToken}`
}

const BASE_URL = '/api/blogs'

const create = async (newObject, id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const res = await axios.post(`${BASE_URL}/${id}/comments`, newObject, config)
  return res.data
}

export default { create, setToken }
