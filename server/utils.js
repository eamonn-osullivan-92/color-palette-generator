function randomNum(array) {
  return Math.floor(Math.random() * array.length)
}

function componentToHex(c) {
  let hex = c.toString(16).toUpperCase()
  return hex.length == 1 ? '0' + hex : hex
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function rgbArraytoHexArray(array) {
  let colorOne = rgbToHex(array[0][0], array[0][1], array[0][2])
  let colorTwo = rgbToHex(array[1][0], array[1][1], array[1][2])
  let colorThree = rgbToHex(array[2][0], array[2][1], array[2][2])
  let colorFour = rgbToHex(array[3][0], array[3][1], array[3][2])
  let colorFive = rgbToHex(array[4][0], array[4][1], array[4][2])

  return [colorOne, colorTwo, colorThree, colorFour, colorFive]
}

function hexToRgb(hex) {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16))
}

// loops through array and parses color string into an
function parseColors(array) {
  for (let object of array) {
    object.colors = JSON.parse(object.colors)
  }
  return array
}

module.exports = {
  randomNum,
  parseColors,
  rgbArraytoHexArray,
  rgbToHex,
  hexToRgb,
}
