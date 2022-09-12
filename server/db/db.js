const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const conn = require('knex')(config)

function getPalettes(db = conn) {
  return db('palettes').select()
}

function addPalette(array, db = conn) {
  return db('palettes').insert({
    colors: JSON.stringify(array),
  })
}

function userExists(username, db = conn) {
  return db('users')
    .where('username', username)
    .then((usersFound) => usersFound.length > 0)
}

function getUser(id, db = conn) {
  return db('users').select('username').where('auth0_id', id).first()
}

function createUser(user, db = conn) {
  return db('users').insert(user)
}

module.exports = { getPalettes, addPalette, userExists, getUser, createUser }
