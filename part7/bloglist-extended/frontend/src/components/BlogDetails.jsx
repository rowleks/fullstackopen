import { useUser } from '../context/UserContext'
import { useBlogResource } from '../hooks'
import CommentSection from './CommentSection'

const BlogInfo = ({ blog, handleLike, handleDelete, loggedUser }) => {
  return (
    <div className="space-y-3">
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <p className="my-4">
        {blog.likes} Likes{' '}
        <button className="like-btn" onClick={() => handleLike(blog)}>
          Like
        </button>
      </p>

      <p>
        Added by <b>{blog.author} </b>
      </p>

      {loggedUser.user?.id === blog.user.id && (
        <button className="delete-btn" onClick={() => handleDelete(blog)}>
          Remove
        </button>
      )}
    </div>
  )
}

const BlogDetails = ({ blog }) => {
  const { user: loggedUser } = useUser()
  const [blogs, service] = useBlogResource()

  if (!blog) return null
  const handleLike = blog => {
    const updateBlogPayload = { ...blog, likes: blog.likes + 1 }
    service.update(updateBlogPayload)
  }

  const handleDelete = blog => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (confirmDelete) {
      service.remove(blog.id)
    }
  }

  const comments = blogs.data?.find(b => b.id === blog.id)?.comments

  return (
    <>
      <div className="space-y-8">
        <BlogInfo
          blog={blog}
          handleDelete={handleDelete}
          handleLike={handleLike}
          loggedUser={loggedUser}
        />

        <CommentSection blogId={blog.id} comments={comments} />
      </div>
    </>
  )
}

export default BlogDetails
