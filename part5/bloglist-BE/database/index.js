const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')
// const { MongoMemoryServer } = require('mongodb-memory-server')

// let mongoServer

const connectToMongo = async uri => {
  logger.info('connecting to', uri)

  try {
    await mongoose.connect(uri)
    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('error connection to MongoDB:', error.message)
    process.exit(1)
  }
}

const connect = async () => {
  if (process.env.NODE_ENV === 'test') {
    // mongoServer = await MongoMemoryServer.create()
    await connectToMongo(config.MONGODB_TEST_URI)
  } else {
    await connectToMongo(config.MONGODB_URI)
  }
}

const close = async () => {
  await mongoose.connection.close()
  // if (mongoServer) {
  //   await mongoServer.stop()
  // }
}

const clear = async () => {
  const { collections } = mongoose.connection
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

module.exports = { connect, close, clear }
