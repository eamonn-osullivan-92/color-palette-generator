import request from 'superagent'

export async function getPalettes() {
  const resp = await request.get('/api/v1/palettes')
  return resp.body
}

export async function getAPalette(id) {
  const resp = await request.get('/api/v1/palettes/' + id)
  return resp.body
}

export async function generatePalette() {
  const palette = await request.get('/api/v1/palettes/generate')
  const parsed = JSON.parse(palette.body)
  return parsed
}

export async function generateTargetedPalette(colorOne, colorTwo) {
  const palette = await request
    .post('/api/v1/palettes/generatetarget')
    .send({ colorOne, colorTwo })
  const parsed = JSON.parse(palette.body)
  return parsed
}
