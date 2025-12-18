import { useEffect, useState } from 'react'
import blogService from '../services/blogService'
import Notification from './Notification'
import { getLoggedUser } from '../utils/getLoggedUser'
import CreateBlogSection from './CreateBlogSection'
import BlogItem from './BlogItem'

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
