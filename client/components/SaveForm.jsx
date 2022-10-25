import React, { useState } from 'react'
import { savePalette } from '../apiClient'

import { auth } from '../../server/firebase.config'

export default function SaveForm({ userPalette, generatedPalette, setIsSave }) {
  const [name, setName] = useState('')

  const handleSave = () => {
    //save
    let palette = generatedPalette.map((color, index) =>
      userPalette[index] !== null ? (color = userPalette[index]) : color
    )
    auth.currentUser
      .getIdToken()
      .then((idToken) => {
        console.log(idToken)
        savePalette(name, palette, idToken)
        setIsSave((prevState) => !prevState)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className="save-modal">
      <form onSubmit={handleSave}>
        <label htmlFor="name">Palette Name: </label>
        <input
          type="text"
          id="save-name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

        <button className="confirm-save-btn">Confirm</button>
      </form>
    </div>
  )
}
