const request = require('superagent')
const express = require('express')
const router = express.Router()
const db = require('../db/db')
const utils = require('../utils')
const checkJwt = require('../auth0')

router.get('/', checkJwt, (req, res) => {
  let id = req.user?.sub
  db.getPalettes(id)
    .then((palettes) => {
      let parsedColors = utils.parseColors(palettes)
      res.json(parsedColors)
    })
    .catch((err) => {
      console.log(err)
      res.send('Not good. ' + err.message)
    })
})

router.post('/generatetarget', async (req, res) => {
  const newPalette = req.body
  const palette = await request
    .post('http://colormind.io/api/')
    .set('Content-Type', 'application/json')
    .send(
      JSON.stringify({
        model: 'default',
        input: newPalette,
      })
    )
  return res.json(palette.text)
})

// add color to palettes
router.post('/generate/save', checkJwt, (req, res) => {
  let id = req.user?.sub
  let { name, palette } = req.body

  db.addPalette(id, name, palette)
    .then(() => {
      console.log('saved')
    })
    .catch((err) => {
      console.log(err)
      res.send('Not good. ' + err.message)
    })
})

// TODO
// delete
// update

module.exports = router
