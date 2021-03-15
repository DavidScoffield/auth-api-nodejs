const jwt = require('jsonwebtoken')
const { SECRETKEY } = require('./config')

const createToken = ({ id }) => {
  return jwt.sign({ id }, SECRETKEY, { expiresIn: 86400 })
}

const decodeToken = (token) => {
  return jwt.verify(token, SECRETKEY)
}

module.exports = {
  createToken,
  decodeToken,
}
