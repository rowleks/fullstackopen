/* eslint-disable no-unused-vars */
const dummy = blogsList => 1

const calculateTotalLikes = blogList => {
  if (blogList.length < 1) return 0
  return blogList.reduce((sum, item) => sum + item.likes, 0)
}

const calculateFaveBlog = blogList =>
  blogList.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )

module.exports = { dummy, calculateTotalLikes, calculateFaveBlog }
