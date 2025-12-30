import { Link } from 'react-router-dom'

const BlogItem = ({ blog }) => {
  return (
    <>
      <div className="blog-item space-y-2">
        <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
      </div>
    </>
  )
}
export default BlogItem
