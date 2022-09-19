import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { savePalette } from '../apiClient'

export default function SaveForm({ userPalette, generatedPalette, setIsSave }) {
  const token = useSelector((state) => state.loggedInUser.token)
  const [name, setName] = useState('')

  const handleSave = () => {
    //save
    let palette = generatedPalette.map((color, index) =>
      userPalette[index] !== null ? (color = userPalette[index]) : color
    )
    console.log(palette)
    savePalette(name, palette, token)
    setIsSave((prevState) => !prevState)
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

        <button className="btn-primary">Confirm</button>
      </form>
    </div>
  )
}
