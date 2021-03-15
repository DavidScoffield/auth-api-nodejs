const User = require('../models/User')
const { decodeToken } = require('../utils/jwt')

const verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) return res.status(403).json({ error: 'Missing token' })

  const decodeToke = decodeToken(token)
  req.userId = decodeToke.id

  const userFound = await User.findById({ _id: req.userId })
  if (!userFound) return res.status()
  console.log(userFound)
  next()
}

module.exports = {
  verifyToken,
}
