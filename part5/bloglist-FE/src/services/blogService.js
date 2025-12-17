import axios from 'axios'

let token

const setToken = jwtToken => {
  token = `Bearer ${jwtToken}`
}

const BASE_URL = '/api/blogs'

const getAllBlogs = async () => {
  const res = await axios.get(BASE_URL)
  return res.data
}

const createBlog = async newObject => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const res = await axios.post(BASE_URL, newObject, config)
  return res.data
}

export default { getAllBlogs, createBlog, setToken }
