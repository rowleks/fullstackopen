import { useState } from 'react'

const BlogItem = ({ blog, onLike, onDelete, user }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpansion = () => {
    setExpanded(!expanded)
  }
  return (
    <>
      <div className="blog-item space-y-2">
        <div className="">
          <span>{blog.title} </span>
          <em>{blog.author} </em>
          <button onClick={handleExpansion} className="underline">
            {!expanded ? 'View' : 'Hide'}
          </button>
        </div>
        {expanded && (
          <div className="space-y-3">
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
            <p className="my-4">
              Likes: {blog.likes}{' '}
              <button className="like-btn" onClick={onLike}>
                Like
              </button>
            </p>

            {user && user.id === blog.user.id && (
              <button className="delete-btn" onClick={onDelete}>
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
