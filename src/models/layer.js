const mongoose = require("mongoose")
const User = require("./user")

const layerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  duration: {
    type: Number
  },
  end: {
    type: Date
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User"
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

const Layer = mongoose.model("Layer", layerSchema)
module.exports = Layer
