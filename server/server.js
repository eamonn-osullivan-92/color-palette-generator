const path = require('path')
const express = require('express')

const routes = require('./routes/routes.js')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use('/api/v1/palettes', routes)

//CAUSES API TO BREAK
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

module.exports = server
