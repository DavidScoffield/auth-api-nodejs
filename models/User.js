const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Role = require('./Roles')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    min: 7,
    max: 9,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Role,
    },
  ],
})

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model('User', userSchema)
