const express = require('express')
const UserRouter = require('./routers/user')
const LayerRouter = require('./routers/layer')
const EventRouter = require('./routers/event')
require('./db/mongoose')

//require('./db/mongoose.js')

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(UserRouter)
app.use(LayerRouter)
app.use(EventRouter)
app.listen(port, () => {
  console.log("timeline app: server is up on port:", port)
})
