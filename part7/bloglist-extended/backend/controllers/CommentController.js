const router = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')
const User = require('../models/user')

router.post('/:id/comments', userExtractor, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'invalid token' })
  }
  const { comment } = req.body
  const blog = await Blog.findById(req.params.id)

  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(400).json({ error: 'userId missing or invalid' })
  }

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  const newComment = new Comment({
    comment,
    blog: blog._id,
    user: user._id,
  })

  const savedComment = await newComment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  res.status(201).json(savedComment)
})

module.exports = router
