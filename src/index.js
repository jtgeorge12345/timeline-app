const express = require('express')

require('./db/mongoose.js')

const app = express()
const port = process.env.PORT

console.log(port)


app.get("/", (req, res) => {
  try{
    res.status(200).send("app is up on port "+ port)
  } catch(e) {
      console.log("nope")
  }
})

app.listen(port, () => {
  console.log("timeline app: server is up on port:", port)
})
