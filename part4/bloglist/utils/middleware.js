const morgan = require('morgan')
const logger = require('./logger')

morgan.token('post-data', req => {
  if (req.method === 'POST') {
    const body = { ...req.body }
    if (body.password) {
      body.password = '[HIDDEN]'
    }
    return JSON.stringify(body)
  }
  return ''
})

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :post-data'
)

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

/* eslint-disable no-unused-vars*/
const errorHandler = (error, req, response, __) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response.status(400).json({ error: 'username already exits' })
  }
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
}
