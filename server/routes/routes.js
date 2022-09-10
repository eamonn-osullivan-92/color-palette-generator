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

// router.get('/generate', async (req, res) => {
//   const palette = await request
//     .post('http://colormind.io/api/')
//     .set('Content-Type', 'application/json')
//     .send({
//       model: 'ui',
//     })
//   return res.json(palette.text)
// })

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

// non async version
// router.get('/generate', (req, res) => {
//   utils
//     .fetchRandomPalette()
//     .then((palette) => {
//       res.render('generate', palette)
//     })
//     .catch((err) => {
//       console.log(err)
//       res.send('Not good. ' + err.message)
//     })
// })

// get targeted palette
// router.post('/generate', (req, res) => {
//   let { colorOne, colorTwo } = req.body

//   utils
//     .fetchTargetedPalette(colorOne, colorTwo)
//     .then((palette) => {
//       res.render('generate', palette)
//     })
//     .catch((err) => {
//       console.log(err)
//       res.send('Not good. ' + err.message)
//     })
// })

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
// built in color picker (react, bootstrap, other library or module.)

module.exports = router

module.exports = router
