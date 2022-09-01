const path = require('path')
const express = require('express')

const routes = require('./routes/routes.js')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

//CAUSES API TO BREAK
server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

server.use('/home', routes)

module.exports = server
