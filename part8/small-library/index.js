require('dotenv').config()

const db = require('./db')
const startServer = require('./server')

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 4000

const main = async () => {
  await db.connect(MONGODB_URI)
  startServer(PORT)
}

main()
