import React from 'react'
import { deletePalette } from '../apiClient'

export default function Palette({ palette, token, setUserPalettes }) {
  const handleDelete = async () => {
    let res = await deletePalette(palette.name, token)
    setUserPalettes(res)
  }

  return (
    <div className="palette-container">
      <div className="palette-heading">
        <h3 className="palette-name">{palette.name}</h3>
        <button className="delete-btn" onClick={handleDelete}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div className="palette">
        {palette.colors.map((color, i) => (
          <div
            key={i}
            className="color"
            style={{ backgroundColor: `${color}` }}
          >
            <div className="palette-tools-container">
              <div className="palette-current-color">{color.toUpperCase()}</div>

              <button className="copy-btn">
                <span className="copy-tooltip">Copy Hex</span>
                <span className="material-icons">content_copy</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
