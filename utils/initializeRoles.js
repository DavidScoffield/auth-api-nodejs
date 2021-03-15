const Role = require('../models/Roles')
const { ROLES } = require('./config')

const initializeRoles = async () => {
  try {
    // Count Documents
    const countOfRoles = await Role.estimatedDocumentCount()

    // Cecking if roles already exist
    if (countOfRoles > 0) return

    // Create default roles
    const values = await Promise.all([
      new Role({ name: 'client' }).save(),
      new Role({ name: 'driver' }).save(),
      new Role({ name: 'admin' }).save(),
    ])

    console.log(' * Basic roles saved')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  initializeRoles,
}
