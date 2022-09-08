import React, { useState } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'

export default function GeneratedColor({ currentColor }) {
  const [color, setColor] = useState(currentColor)
  const [isSelector, setIsSelector] = useState(false)

  return (
    <div className="generated-color-container">
      <div
        className="generated-color"
        style={{ backgroundColor: `${color}` }}
      ></div>
      <div className="color-tools-container">
        <div className="selector-button-container">
          <div className="current-color">{color.toUpperCase()}</div>
          <button
            onClick={() => setIsSelector(!isSelector)}
            className="change-color"
          >
            <span className="material-icons">edit</span>
          </button>
          <button className="lock-color">
            <span className="material-icons">lock</span>
          </button>
        </div>
      </div>
      <div className="color-picker-selector">
        {isSelector && <HexColorPicker color={color} onChange={setColor} />}
        {isSelector && <HexColorInput color={color} onChange={setColor} />}
      </div>
    </div>
  )
}
