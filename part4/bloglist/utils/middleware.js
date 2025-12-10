const morgan = require('morgan')
const logger = require('./logger')

morgan.token('post-data', req => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :post-data'
)

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
}
