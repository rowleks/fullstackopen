import Notification from './Notification'
import CreateBlogSection from './CreateBlogSection'
import BlogItem from './BlogItem'
import { useBlogResource } from '../hooks'
import { useUser } from '../context/UserContext'

const BlogList = ({ blogs, onLike, onDelete, user }) => {
  return (
    <div className="blogitem-wrapper space-y-3">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <BlogItem
            key={blog.id}
            blog={blog}
            onLike={() => onLike(blog)}
            onDelete={() => onDelete(blog)}
            user={user}
          />
        ))}
    </div>
  )
}

const BlogSection = () => {
  const [resources, service] = useBlogResource()
  const { user: loggedUser, dispatch } = useUser()
  const username = loggedUser ? loggedUser.user.username : ''
  const blogs = resources.data || []

  const handleLike = blog => {
    const updateBlogPayload = { ...blog, likes: blog.likes + 1 }
    service.update(updateBlogPayload)
  }

  const handleDelete = blog => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (confirmDelete) {
      service.remove(blog.id, loggedUser.token)
    }
  }

  return (
    <div className="space-y-3">
      <h2>Blogs</h2>
      <p>
        Welcome <b>{username} </b>
        <button
          className="logout-btn"
          onClick={() => dispatch({ type: 'LOGOUT' })}
        >
          Logout
        </button>
      </p>

      <div>
        <Notification />
      </div>
      <section>
        <CreateBlogSection />
      </section>
      <section className="space-y-4">
        <h3>Your Saved Blogs</h3>
        {resources.isPending && <p>Loading blogs...</p>}
        <BlogList
          blogs={blogs}
          onLike={handleLike}
          onDelete={handleDelete}
          user={loggedUser ? loggedUser.user : null}
        />
      </section>
    </div>
  )
}

export default BlogSection
