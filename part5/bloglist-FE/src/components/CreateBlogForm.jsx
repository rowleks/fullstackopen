import { useState } from 'react'
import { getLoggedUser } from '../utils/getLoggedUser'
import blogService from '../services/blogService'

const CreateBlogForm = ({ setMsg, setBlogs, blogs }) => {
  const [formInput, setFormInput] = useState({ title: '', author: '', url: '' })

  const { token } = getLoggedUser()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      blogService.setToken(token)

      const newBlog = { ...formInput }
      const result = await blogService.createBlog(newBlog)

      setBlogs(blogs.concat(result))
      setMsg({ error: '', success: 'Blog created successfully' })
      setFormInput({ title: '', author: '', url: '' })
    } catch (error) {
      console.error(error)

      const serverErrorMsg = error.response.data.error
      setMsg({ error: serverErrorMsg, success: '' })
    }
  }
  return (
    <div>
      <h3>Create New Blog</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>title: </span>
            <input
              type="text"
              name="title"
              id="title"
              value={formInput.title}
              onChange={e =>
                setFormInput({ ...formInput, title: e.target.value })
              }
            />
          </label>
        </div>
        <br />

        <div>
          <label>
            <span>author: </span>
            <input
              type="text"
              name="author"
              id="author"
              value={formInput.author}
              onChange={e =>
                setFormInput({ ...formInput, author: e.target.value })
              }
            />
          </label>
        </div>
        <br />

        <div>
          <label>
            <span>url: </span>
            <input
              type="text"
              name="url"
              id="url"
              value={formInput.url}
              onChange={e =>
                setFormInput({ ...formInput, url: e.target.value })
              }
            />
          </label>
        </div>
        <br />

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
