import { useState } from 'react'
import { useBlogResource } from '../hooks'

const CreateNewBlogForm = ({ onBlogCreated }) => {
  const [formInput, setFormInput] = useState({ title: '', author: '', url: '' })
  const [_, service] = useBlogResource()

  const handleSubmit = event => {
    event.preventDefault()
    onBlogCreated && onBlogCreated()
    service.create(formInput, {
      onSuccess: () => {
        setFormInput({ title: '', author: '', url: '' })
      },
    })
  }

  return (
    <div className="space-y-4">
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

        <button className="create-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateNewBlogForm
