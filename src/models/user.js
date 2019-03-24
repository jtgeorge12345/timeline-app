const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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

  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],

  //Todo: Add later: Avatar/picture
  //Todo: Add authentication
}, {
  timestamps:true
})

//////////////////////Find a user by email and pw/////////////////////
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new Error("Login Failed")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Login Failed")
  }

  return user;
}

/////////////////////////Generate an authentication token///////////////
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

//////////////////////Hashing Passwords////////////////////////
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model("User", userSchema)
module.exports = User
