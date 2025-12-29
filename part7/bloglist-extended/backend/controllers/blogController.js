const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

router.get('/', async (_, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', {})
  res.json(blogs)
})

router.post('/', userExtractor, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(req.user.id)
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

router.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'invalid token' })
    }

    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'unauthorized to delete this blog' })
    }

    await Blog.findByIdAndDelete(req.params.id)

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', userExtractor, async (req, res, next) => {
  const { title, author, url, likes } = req.body
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'invalid token' })
    }
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ error: 'Blog not found' })

    blog.title = title || blog.title
    blog.author = author || blog.author
    blog.url = url || blog.url
    blog.likes = likes ? likes : blog.likes

    const updatedBlog = await blog.save()
    await updatedBlog.populate('user', { username: 1, name: 1 })
    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = router
