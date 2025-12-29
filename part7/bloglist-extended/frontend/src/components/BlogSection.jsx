import Notification from './Notification'
import CreateBlogSection from './CreateBlogSection'
import BlogItem from './BlogItem'
import { useBlogResource } from '../hooks'

const BlogList = ({ blogs }) => {
  return (
    <div className="blogitem-wrapper space-y-3">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <BlogItem blog={blog} key={blog.id} />
        ))}
    </div>
  )
}

const BlogSection = () => {
  const [resources, _] = useBlogResource()
  const blogs = resources.data || []

  return (
    <div className="space-y-3">
      <div>
        <Notification />
      </div>
      <section>
        <CreateBlogSection />
      </section>
      <section className="space-y-4">
        <h3>Your Saved Blogs</h3>
        {resources.isPending && <p>Loading blogs...</p>}
        <BlogList blogs={blogs} />
      </section>
    </div>
  )
}

export default BlogSection
