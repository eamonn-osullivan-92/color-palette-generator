const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const conn = require('knex')(config)

function getPalettes(db = conn) {
  return db('palettes').select()
}

function addPalette(id, name, palette, db = conn) {
  return db('palettes').insert({
    name: name,
    colors: JSON.stringify(palette),
    added_by_user: id,
  })
  // .insert('palettes', JSON.stringify(palette))
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
