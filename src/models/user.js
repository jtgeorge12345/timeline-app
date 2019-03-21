const mongoose = require("mongoose")
const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Email Invalid")
      }
    }
  },
  password: {
    type: String,
    unique: true,
    validate(value) {
      if (value.length < 7) {
        throw new Error("Password is less than 7 characters")
      }
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password does not meet complexity requirements")
      }
    }
  },

  //Todo: Uncomment tokens for authentication
  // tokens: [{
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }],

  //Todo: Add later: Avatar/picture
  //Todo: Add authentication
}, {
  timestamps:true
})


const User = mongoose.model("User", userSchema)
module.exports = User
