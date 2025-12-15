const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const extractToken = authHeader => {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '')
  }
  return null
}

router.get('/', async (_, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  const token = extractToken(req.get('authorization'))
  console.log(token)
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)
  if (!tokenPayload.id) {
    return res.status(401).json({ error: 'invalid token' })
  }

  try {
    const user = await User.findById(tokenPayload.id)
    if (!user) {
      return res.status(400).json({ error: 'userId missing or invalid' })
    }
    const blog = new Blog({ ...req.body, user: user._id })
    const savedBlog = await blog.save()
    await User.findByIdAndUpdate(user._id, { $push: { blogs: savedBlog._id } })
    await savedBlog.populate('user', { username: 1, name: 1 })
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
    if (deletedBlog) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    )
    if (updatedBlog) {
      res.json(updatedBlog)
    } else {
      res.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
