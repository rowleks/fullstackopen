const _ = require('lodash')

/* eslint-disable no-unused-vars */
const dummy = blogList => 1

const calculateTotalLikes = blogList => {
  if (blogList.length < 1) return 0
  return blogList.reduce((sum, item) => sum + item.likes, 0)
}

const calculateFaveBlog = blogList =>
  blogList.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )

const mostBlogs = blogList => {
  if (blogList.length === 0) return {}

  const authorCounts = _.countBy(blogList, 'author')
  const mostBlogsAuthor = _.maxBy(
    Object.keys(authorCounts),
    author => authorCounts[author]
  )

  return {
    author: mostBlogsAuthor,
    blogs: authorCounts[mostBlogsAuthor],
  }
}

const mostLikes = blogList => {
  if (blogList.length === 0) return {}

  const authorLikes = _.reduce(
    blogList,
    (result, blog) => {
      result[blog.author] = (result[blog.author] || 0) + blog.likes
      return result
    },
    {}
  )

  const mostLikedAuthor = _.maxBy(
    Object.keys(authorLikes),
    author => authorLikes[author]
  )

  return {
    author: mostLikedAuthor,
    likes: authorLikes[mostLikedAuthor],
  }
}

module.exports = {
  dummy,
  calculateTotalLikes,
  calculateFaveBlog,
  mostBlogs,
  mostLikes,
}
