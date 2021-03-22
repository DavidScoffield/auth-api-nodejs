const { restart } = require('nodemon')
const Roles = require('../models/Roles')

const checkRolesExisted = async (req, res, next) => {
  const { roles } = req.body

  const rolesDB = await Roles.find({})
  const dataBaseRolesNames = rolesDB.map((role) => role.name)

  for (let i = 0; i < roles.length; i++) {
    let role = roles[i]
    if (!dataBaseRolesNames.includes(role)) {
      return res
        .status(600)
        .json({ error: `The role ${role} isn't valid. The valids roles are ${dataBaseRolesNames}` })
    }
  }
  next()
}

module.exports = checkRolesExisted
