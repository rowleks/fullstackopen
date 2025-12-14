const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

router.get('/', async (_, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password must be at least 3 characters long' })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
