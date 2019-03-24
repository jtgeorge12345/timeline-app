const express = require('express')
const User = require('./models/user')
const Layer = require('./models/layer')
const UserRouter = require('./routers/user')
const LayerRouter = require('./routers/layer')
require('./db/mongoose')

//require('./db/mongoose.js')

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(UserRouter)
app.use(LayerRouter)
app.listen(port, () => {
  console.log("timeline app: server is up on port:", port)
})
