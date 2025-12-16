const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    const tokenPayload = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1hr',
    })

    res.status(200).send({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
