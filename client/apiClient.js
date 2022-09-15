import request from 'superagent'

const rootUrl = '/api/v1'

export async function getPalettes(token) {
  try {
    const resp = await request
      .get(`${rootUrl}/palettes`)
      .set('Authorization', `Bearer ${token}`)
    return resp.body
  } catch (err) {
    console.log(err.message)
  }
}

export async function generatePalette() {
  try {
    const palette = await request.get(`${rootUrl}/palettes/generate`)
    const parsed = JSON.parse(palette.body)
    return parsed
  } catch (err) {
    console.log(err.message)
  }
}

export async function generateTargetedPalette(newPalette, queryMode) {
  try {
    const palette = await request
      .post(`${rootUrl}/palettes/generatetarget`)
      .send({ newPalette })
      .send({ queryMode })
    const parsed = JSON.parse(palette.body)
    return parsed
  } catch (err) {
    console.log(err.message)
  }
}

export async function savePalette(name, palette, token) {
  try {
    const res = await request
      .post(`${rootUrl}/palettes/generate/save`)
      .send({ name, palette })
      .set('Authorization', `Bearer ${token}`)
    return res.body
  } catch (err) {
    console.log(err.message)
  }
}

export async function deletePalette(name, token) {
  try {
    const res = await request
      .del(`${rootUrl}/palettes/del`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name })
    return res.body
  } catch (err) {
    console.log(err.message)
  }
}

// USERS //
export async function getUser(token) {
  try {
    const res = await request
      .get(`${rootUrl}/users`)
      .set('Authorization', `Bearer ${token}`)
    return res.body
  } catch (err) {
    return logError(err)
  }
}

export async function addUser(user, token) {
  console.log(user)
  try {
    return await request
      .post(`${rootUrl}/users`)
      .set('Authorization', `Bearer ${token}`)
      .send(user)
  } catch (err) {
    return logError(err)
  }
}

function logError(err) {
  if (err.response.text === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error(
      'Only the user who added the fruit may update and delete it'
    )
  } else {
    // eslint-disable-next-line no-console
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
