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

const updateBlog = async newObject => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.put(`${BASE_URL}/${newObject.id}`, newObject, config)
  return res.data
}

const deleteBlog = async id => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.delete(`${BASE_URL}/${id}`, config)
  return res.data
}

export default { getAllBlogs, createBlog, setToken, updateBlog, deleteBlog }
