const express = require("express")
const path = require("path")
const app = express()


// Middlewares
const bodyParse = require('body-parser')
var cors = require('cors')
app.use(bodyParse.json())
app.use(cors())


// App
app.use(express.static(__dirname + "/public"))


// routes endpoints
const productsApiRouter = require('./src/Routes/products')
app.use("/api/items", productsApiRouter)


// Listening
const server = app.listen(5000, function() {
  console.log(`Listening http://localhost:${server.address().port}`)
})