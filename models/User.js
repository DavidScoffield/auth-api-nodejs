const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Role = require('./Roles')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    dni: {
      type: String,
      required: true,
      unique: true,
      minlength: 7,
      maxlength: 9,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Role,
      },
    ],
  },
  {
    timestamps: true,
  }
)

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

// Validator for mongoose
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
