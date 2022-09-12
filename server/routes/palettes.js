const request = require('superagent')
const express = require('express')
const router = express.Router()
const db = require('../db/db')
const utils = require('../utils')

router.get('/', (req, res) => {
  db.getPalettes()
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
router.post('/generate/save', (req, res) => {
  let colors = req.body
  let array = colors.colors.split(',')
  db.addPalette(array)
    .then(() => {
      res.redirect('/generate')
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
