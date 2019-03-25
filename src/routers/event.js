const express = require('express')
const Event = require("../models/event")
const Layer = require("../models/layer")
const auth = require('../middleware/auth')

const router = new express.Router()

/*

Event Routes:

Create an new event

Get All Events (for logged in user)
Get an event by name

Update an event

Delete an event
*/

router.post('/events', auth, async (req, res) => {
  try {
    const event = new Event(req.body)
    event.owner = req.user
    event.layer = await Layer.findById(req.body.layer)
    await event.save()
    res.send(event)
  } catch (err) {
    res.status(500).send(err.message)
  }

})


router.get("/events", auth, async (req, res) => {
  try {
    const events = await Event.find({owner: req.user._id})
    res.send(events)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/events/:id', auth, async (req, res) => {
  const _id = req.params.id
  const owner = req.user

  try {
    const event = await Event.findOne({_id, owner})
    res.send(event)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.patch('/events/:id', auth, async (req, res) => {
  const allowedUpdates = ["title", "layer", "start", "end", "duration",
    "description"]
  const updates = Object.keys(req.body)

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (! isValidOperation) {
    res.status(500).send("cannot update that set of attributes")
    return
  }

  const _id = req.params.id
  const owner = req.user
  try {
    const event = await Event.findOne({_id, owner})

    if (!event) {
      res.status(404).send("Could Not Find Event")
      return
    }

    updates.forEach((update) => event[update] = req.body[update])
    await event.save()
    res.send(event)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.delete('/events/:id', auth, async (req, res) => {
  const _id = req.params.id
  const owner = req.user

  try {
    const event = await Event.findOneAndDelete({_id, owner})

    if (!event) {
      res.status(404).send("Could not find event for deletion")
      return
    }
    res.send(event)
  } catch (err) {
    res.status(500).send(err.message)
  }
})


module.exports = router
