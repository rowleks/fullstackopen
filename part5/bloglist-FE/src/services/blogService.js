import axios from 'axios'

const BASE_URL = '/api/blogs'

const getAllBlogs = async () => {
  const res = await axios.get(BASE_URL)
  return res.data
}

export default { getAllBlogs }
