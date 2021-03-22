const jwt = require('jsonwebtoken')
const { SECRETKEY } = require('./config')

const createJWT = ({ id }) => {
  return jwt.sign({ id }, SECRETKEY, { expiresIn: 86400 })
}

const decodeJWT = (jwt) => {
  return jwt.verify(jwt, SECRETKEY)
}

module.exports = {
  createJWT,
  decodeJWT,
}
