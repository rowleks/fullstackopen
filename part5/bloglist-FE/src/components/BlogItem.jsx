import { useState } from 'react'
import blogService from '../services/blogService'
import { getLoggedUser } from '../utils/getLoggedUser'

const BlogItem = ({
  blog,
  blogList,
  setBlogs,
  setMsg,
  handleLikeCountUpdate,
}) => {
  const [expanded, setExpanded] = useState(false)
  const loggedUser = getLoggedUser()

  const onLike = async () => {
    try {
      blogService.setToken(loggedUser.token)

      const updateBlogPayload = { ...blog, likes: blog.likes + 1 }
      const result = await blogService.updateBlog(updateBlogPayload)
      const updatedBlogList = blogList.map(blog =>
        blog.id === result.id ? result : blog
      )
      setBlogs(updatedBlogList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (confirmDelete) {
      try {
        blogService.setToken(loggedUser.token)
        await blogService.deleteBlog(blog.id)
        const updatedBlogList = blogList.filter(b => b.id !== blog.id)
        setBlogs(updatedBlogList)
      } catch (error) {
        console.log(error)
        const serverErrorMsg = error.response.data.error
        setMsg({ error: serverErrorMsg, success: '' })
      }
    }
  }

  const handleExpansion = () => {
    setExpanded(!expanded)
  }
  return (
    <>
      <div className="blog-item">
        <div>
          <span>{blog.title} </span>
          <em>{blog.author} </em>
          <button onClick={handleExpansion}>
            {!expanded ? 'View' : 'Hide'}
          </button>
        </div>
        {expanded && (
          <div>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
            <p>
              Likes: {blog.likes}{' '}
              <button
                className="like-btn"
                onClick={handleLikeCountUpdate || onLike}
              >
                Like
              </button>
            </p>

            {loggedUser && loggedUser.user.id === blog.user.id && (
              <button className="delete-btn" onClick={handleDelete}>
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
export default BlogItem
