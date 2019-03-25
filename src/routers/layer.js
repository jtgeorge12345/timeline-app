const express = require("express")
const Layer = require("../models/layer.js")
const auth = require("../middleware/auth.js")


const router = new express.Router()

/*

Layer Routes:

Create a new layer

Get All Layers (for logged in user)
Get a layer by name

Update a layer

Delete a layer
*/


router.post("/layers", auth, async (req, res) => {
  try {
    req.body.owner = req.user

    const layer = new Layer(req.body)
    layer.save()
    res.status(201).send(layer)
  } catch (err) {
    res.status(500).send("Could not create layer")
  }
})

router.get('/layers', auth, async (req, res) => {
  try {
    const user = req.user
    const allLayers = await Layer.find({owner:user._id})
    res.send(allLayers)
  } catch (err) {
    res.status(500).send("Could not fetch layers" + err.message)
  }
})

router.get('/layers/:id', auth, async (req, res) => {
  const _id = req.params.id
  const owner = req.user._id
  try{
    const layer = await Layer.find({_id, owner})
    res.send(layer)
  } catch (err) {
    res.status(500).send("could not fetch layer")
  }
})

router.patch('/layers/:id', auth, async (req, res) => {
  const _id = req.params.id
  const owner = req.user._id
  const updates = Object.keys(req.body)

  const allowedUpdates = ['title','description', 'duration', 'start']

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if (! isValidOperation) {
    res.status(400).send("Cannot update that set of properties")
    return
  }

  try {
    const layer = await Layer.findOne({_id, owner})
    updates.forEach((update) => layer[update] = req.body[update])
    await layer.save()
    res.send(layer)
  } catch (err) {
    res.status(500).send("Couldn't update layer"+err.message)
  }

})

router.delete("/layers/:id", auth, async (req, res) => {
  const owner = req.user
  const _id = req.params.id
  try{
    const layer = await Layer.findOneAndDelete({owner, _id})

    if (!layer) {
      res.status(404).send({error:"Could not find layer for deletion"})
      return
    }

    res.send(layer)
  } catch (err) {
    res.status(500).send('Unable to delete Layer'+err.message)
  }
})

module.exports = router
