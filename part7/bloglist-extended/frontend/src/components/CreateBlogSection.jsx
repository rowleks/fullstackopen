import { useRef, useState } from 'react'
import { getLoggedUser } from '../utils/getLoggedUser'
import blogService from '../services/blogService'
import Toggleable from './Toggleable'
import CreateNewBlogForm from './CreateNewBlogForm'

const CreateBlogSection = ({ setMsg, setBlogs, blogs }) => {
  const [formInput, setFormInput] = useState({ title: '', author: '', url: '' })
  const createNoteRef = useRef()

  const { token } = getLoggedUser()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      createNoteRef.current.toggleVisibility()
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
    <>
      <Toggleable buttonLabel="Create New Blog" ref={createNoteRef}>
        <CreateNewBlogForm
          handleSubmit={handleSubmit}
          setFormInput={setFormInput}
          formInput={formInput}
        />
      </Toggleable>
    </>
  )
}

export default CreateBlogSection
