const Roles = require('../models/Roles')
const User = require('../models/User')
const { decodeJWT } = require('../utils/jwt')

const verifyJWT = async (req, res, next) => {
  let jwt = req.headers['Authorization']
  if (!jwt) return res.status(403).json({ error: 'Missing jwt' })

  const jwtDecoded = decodeJWT(jwt)

  req.userId = jwtDecoded.id

  const userFound = await User.findById({ _id: req.userId })
  if (!userFound) return res.status(401).json({ error: 'User not found, authorization denied' })

  req.userInfo = userFound
  next()
}

const isAdmin = async (req, res, next) => {
  const { userInfo } = req
  const { roles: idUserRoles } = userInfo

  const userRoles = await Roles.find({ _id: { $in: idUserRoles } })

  const adminIncluded = userRoles.map((roles) => roles.name).includes('admin')

  adminIncluded ? next() : res.status(403).json({ message: 'Require admin role!' })
}

const isDriver = async (req, res, next) => {
  const { userInfo } = req
  const { roles: idUserRoles } = userInfo

  const userRoles = await Roles.find({ _id: { $in: idUserRoles } })

  const driverIncluded = userRoles.map((roles) => roles.name).includes('driver')

  driverIncluded ? next() : res.status(403).json({ message: 'Require driver role!' })
}

const isClient = async (req, res, next) => {
  const { userInfo } = req
  const { roles: idUserRoles } = userInfo

  const userRoles = await Roles.find({ _id: { $in: idUserRoles } })

  const clientIncluded = userRoles.map((roles) => roles.name).includes('client')

  clientIncluded ? next() : res.status(403).json({ message: 'Require client role!' })
}

module.exports = {
  verifyJWT,
  isAdmin,
  isDriver,
  isClient,
}
