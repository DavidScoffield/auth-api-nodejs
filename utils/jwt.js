const jwt = require('jsonwebtoken')
const { SECRETKEY } = require('./config')

const createToken = ({ id }) => {
  return jwt.sign({ id }, SECRETKEY, { expiresIn: 86400 })
}

module.exports = {
  createToken,
}
