import axios from 'axios'
const BASE_URL = '/api/users'

const getAllUsers = async () => {
  const res = await axios.get(BASE_URL)
  return res.data
}

export default { getAllUsers }
