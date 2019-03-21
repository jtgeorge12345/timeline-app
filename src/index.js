const express = require('express')
const User = require('./models/user')
const Layer = require('./models/layer')
//require('./db/mongoose.js')

const app = express()
const port = process.env.PORT

console.log(port)

const myUser = new User({
  name:"Jason",
  email:"Jason@me.com",
  password:"ThisIsMyPW"
})

const myLayer = new Layer({
  title: "US History",
  start: "3/14/1994"
})

console.log(myUser)
console.log(myLayer)

// app.get("/", (req, res) => {
//   try{
//     res.status(200).send("app is up on port "+ port)
//   } catch(e) {
//       console.log("nope")
//   }
// })
//
// app.listen(port, () => {
//   console.log("timeline app: server is up on port:", port)
// })
