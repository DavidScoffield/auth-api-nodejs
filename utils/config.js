require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const SECRETKEY = process.env.SECRETKEY
const ROLES = ['admin', 'client', 'driver']

module.exports = {
  PORT,
  MONGO_URI,
  ROLES,
  SECRETKEY,
}
