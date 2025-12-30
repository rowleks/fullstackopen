const express = require('express')
const blogRoute = require('./controllers/blogController')
const userRoute = require('./controllers/userController')
const loginRoute = require('./controllers/loginController')
const commentRoute = require('./controllers/CommentController')
const middleware = require('./utils/middleware')
const db = require('./database')
const path = require('node:path')

const app = express()

db.connect()

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use('/api/blogs', blogRoute, commentRoute)
app.use('/api/users', userRoute)
app.use('/api/login', loginRoute)

if (process.env.NODE_ENV === 'test') {
  app.post('/api/reset', async (_, res) => {
    await db.clear()
    res.status(204).end()
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
