import request from 'superagent'

export async function getPalettes() {
  const resp = await request.get('/')
  return resp.body
}

export async function getAPalette(id) {
  const resp = await request.get('/palettes/' + id)
  return resp.body
}
