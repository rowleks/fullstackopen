import { useEffect, useState } from 'react'
import blogService from '../services/blogService'
import Notification from './Notification'
import { getLoggedUser } from '../utils/getLoggedUser'
import CreateBlogSection from './CreateBlogSection'

const BlogItem = ({ blog, blogList, setBlogs, setMsg }) => {
  const [expanded, setExpanded] = useState(false)
  const loggedUser = getLoggedUser()

  const handleLikeCountUpdate = async () => {
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
        <p>
          {blog.title} {''}
          <button onClick={handleExpansion}>
            {!expanded ? 'View' : 'Hide'}
          </button>
        </p>
        {expanded && (
          <div>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
            <p>
              Likes: {blog.likes}{' '}
              <button className="like-btn" onClick={handleLikeCountUpdate}>
                Like
              </button>
            </p>
            <p> {blog.author}</p>

            {loggedUser.user.id === blog.user.id && (
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

const BlogSection = ({ onLogout }) => {
  const [blogs, setBlogs] = useState([])
  const [msg, setMsg] = useState({ error: '', success: '' })
  const [loading, setLoading] = useState(false)

  const loggedUser = getLoggedUser()
  const username = loggedUser ? loggedUser.user.username : ''

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setMsg({ error: '', success: '' })
        const data = await blogService.getAllBlogs()
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setMsg({ error: 'Error fetching blogs', success: '' })
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    if (msg.success || msg.error) {
      const timeoutId = setTimeout(() => {
        setMsg({ error: '', success: '' })
      }, 5000)

      return () => clearTimeout(timeoutId)
    }
  }, [msg.error, msg.success])

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        Welcome <b>{username} </b>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </p>

      <div>
        <Notification successMsg={msg.success} errorMsg={msg.error} />
      </div>
      <section>
        <CreateBlogSection setMsg={setMsg} setBlogs={setBlogs} blogs={blogs} />
      </section>
      <section>
        <h3>Your Saved Blogs</h3>
        {loading && <p>Loading blogs...</p>}
        <div className="blogitem-wrapper">
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <BlogItem
                key={blog.id}
                blog={blog}
                blogList={blogs}
                setBlogs={setBlogs}
                setMsg={setMsg}
              />
            ))}
        </div>
      </section>
    </div>
  )
}

export default BlogSection
