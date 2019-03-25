const mongoose = require("mongoose")
const Layer = require("./layer")
const User = require('./user')

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true
    },
    description: {
      type: String
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
    layer: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Layer"
    }

    //Todo: Add attachments to events

    // {
    //   attachments:[{
    //     attachment: {
    //         type: //Todo: make a schema for attachments
    //     },
    //     {
    //       index: {
    //         type: Number
    //       }
    //     }
    //   }]
    // }
}, {
  timestamps: true
})

const event = mongoose.model("Event", schema)
module.exports = event
