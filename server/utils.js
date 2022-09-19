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

function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0
  if (H.length == 4) {
    r = '0x' + H[1] + H[1]
    g = '0x' + H[2] + H[2]
    b = '0x' + H[3] + H[3]
  } else if (H.length == 7) {
    r = '0x' + H[1] + H[2]
    g = '0x' + H[3] + H[4]
    b = '0x' + H[5] + H[6]
  }
  // Then to HSL
  r /= 255
  g /= 255
  b /= 255
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  if (delta == 0) h = 0
  else if (cmax == r) h = ((g - b) / delta) % 6
  else if (cmax == g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return l
}

module.exports = {
  parseColors,
  rgbArraytoHexArray,
  rgbToHex,
  hexToRgb,
  hexToHSL,
}
