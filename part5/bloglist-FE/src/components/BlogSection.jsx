import { useEffect, useState } from 'react'
import blogService from '../services/blogService'

const BlogItem = ({ blog }) => {
  return (
    <>
      <div>
        {blog.title} by <em>{blog.author}</em>
      </div>
    </>
  )
}

const BlogSection = ({ username, onLogout }) => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await blogService.getAllBlogs()
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setError('Error fetching blogs')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        Welcome <b>{username}</b> <button onClick={onLogout}>Logout</button>
      </p>

      <section>
        <h3>Your Saved Blogs</h3>
        {loading && <p>Loading blogs...</p>}
        {error && <p className="error">{error}</p>}
        {blogs.map((blog, idx) => (
          <BlogItem key={idx} blog={blog} />
        ))}
      </section>
    </div>
  )
}

export default BlogSection
