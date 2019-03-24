const express = require("express")
const User = require("../models/user.js")
const auth = require("../middleware/auth.js")
const router = new express.Router()

/*

User Routes:

Create a new User
Log in
Log Out
Update name
Update email
Update PW
Get Current User
Delete a User Account
*/
//////////// Create new user ///////////////////
router.post("/users", async (req, res) => {
  const user = new User(req.body)
  console.log(user)
  console.log(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (err){
    res.status(500).send("Internal Server Error: Could not create user" )
  }
})

////////////////////////log in///////////////////////
router.post('/users/login', async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    console.log(user)
    const token = await user.generateAuthToken()
    res.send({user, token})
  } catch (err) {
    res.status(500).send("Could Not Log In" + err.message)
  }
})


//////////////////////log out////////////////////////////

router.post('/users/logout', auth, async (req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter((oneToken) => {
      oneToken !== req.token
    })
    req.user.save()
    res.send(req.user)
  } catch (err) {
    res.status(500).send("Could not log out user"+err.message)
  }
})

////////////////////////////Get Self/////////////////////////
router.get('/users/me', auth, async(req, res) => {
  try{
    res.send(req.user)
  } catch(error) {
    res.status(500).send("Could not get user")
  }
})

/////////////////////////////Update User///////////////////////

router.patch('/users/update')

module.exports = router
