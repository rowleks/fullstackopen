const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (_, res) => {
  const blogs = await Blog.find({}).populate('users', { username: 1, name: 1 })
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()
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
