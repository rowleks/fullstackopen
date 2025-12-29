const BlogItem = ({ blog }) => {
  return (
    <>
      <div className="blog-item space-y-2">
        <a href={`/blogs/${blog.id}`}>{blog.title} </a>
      </div>
    </>
  )
}
export default BlogItem
