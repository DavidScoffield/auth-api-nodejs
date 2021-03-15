const Role = require('../models/Roles')
const User = require('../models/User')
const { createToken } = require('../utils/jwt')

const register = async (req, res, next) => {
  const { email, password, roles, dni } = req.body

  // Prevent empty fields
  if (!(email && password && dni))
    return res.status(400).json({
      error: 'some parameter missing',
    })

  // Creating user
  const newUser = new User({
    email,
    dni,
    password: await User.encryptPassword(password),
  })

  // Adding roles to user, if doesn't has, set client rol like default
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } })
    newUser.roles = foundRoles.map((role) => role._id)
  } else {
    const defaultClienteRole = await Role.findOne({ name: 'client' })
    newUser.roles = [defaultClienteRole._id]
  }

  // Saving user in the database
  const savedUser = await newUser.save()

  const token = createToken({ id: savedUser._id })

  res.status(200).json({ token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  // Prevent empty fields
  if (!(email && password))
    return res.status(400).json({
      error: 'some parameter missing',
    })

  // Checking if the user's email is correct
  const user = await User.findOne({ email })

  if (!user)
    return res.status(400).json({
      error: 'The email or password is incorrect',
    })

  // Checking if the user's password match with the password of the DB
  const correctPassword = await User.comparePassword(password, user.password)

  if (!correctPassword)
    return res.status(400).json({
      error: 'The email or password is incorrect',
    })

  const token = createToken({ id: user._id })

  res.status(200).json({ token })
}

module.exports = {
  register,
  login,
}
