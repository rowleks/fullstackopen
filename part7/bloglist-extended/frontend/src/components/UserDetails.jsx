const UserDetails = ({ user }) => {
  if (!user) return null
  return (
    <>
      <div className="space-y-4">
        <h3>{user.name}</h3>
        <h4>Added blogs</h4>
        {user.blogs.length < 1 && <p>No blogs added yet</p>}
        <ul className="space-y-2">
          {user.blogs.map(blog => (
            <li key={blog.id}>
              <a href={`/blogs/${blog.id}`}>{blog.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default UserDetails
