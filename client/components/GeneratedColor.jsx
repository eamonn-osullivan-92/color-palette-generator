import React, { useState } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { hexToRgb } from '../../server/utils'

export default function GeneratedColor({
  index,
  currentColor,
  handleLockedPalettes,
}) {
  const [color, setColor] = useState(currentColor)
  const [isSelector, setIsSelector] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const handleLock = () => {
    // set lock to true/false
    // if true, set locked color, else set to N\
    // Below code is working, but reads backwards
    // changing color before locking will cause lock to reset but query will stay locked.

    isLocked
      ? handleLockedPalettes(index, 'N')
      : handleLockedPalettes(index, hexToRgb(color))
    setIsLocked((current) => !current)
  }

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
          <button className="lock-color" onClick={handleLock}>
            {isLocked ? (
              <span className="material-icons locked-icon">lock</span>
            ) : (
              <span className="material-icons ">lock_open</span>
            )}
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
