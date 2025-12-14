const express = require('express')
const blogRoute = require('./controllers/blogController')
const userRoute = require('./controllers/userController')
const middleware = require('./utils/middleware')
const db = require('./database')

const app = express()

db.connect()

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
