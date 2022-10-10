import React, { useState, useEffect } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { hexToRgb } from '../../server/utils'
import { motion } from 'framer-motion'

export default function GeneratedColor({
  index,
  currentColor,
  handleQueryPalette,
  handleLockedPaletteArray,
  lockedValue,
  handleUserInputPalettes,
}) {
  const [color, setColor] = useState(currentColor)
  const [isSelector, setIsSelector] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const handleCopy = () => {
    navigator.clipboard.writeText(color)
  }

  const handleSelector = () => {
    setIsSelector((prev) => !prev)
  }

  const handleLock = () => {
    //sends color through to the query palette when locking.
    // Updates the locked array state in Generate so lock state will carry through on re-render.
    lockedValue
      ? handleQueryPalette(index, 'N')
      : handleQueryPalette(index, hexToRgb(color))
    handleLockedPaletteArray(!lockedValue, index)
  }

  useEffect(() => {
    if (!isFirstRender) {
      handleUserInputPalettes(color.toUpperCase(), index)

      // reset lock and query palette until user relocks (on final color)
      handleLockedPaletteArray(false, index)
      handleQueryPalette(index, 'N')
    }
    setIsFirstRender(false)
  }, [color])

  return (
    <div className="generated-color-container">
      <motion.div
        className="generated-color"
        style={{
          backgroundColor: `${color}`,
        }}
        initial={{ x: -100, scaleX: 0 }}
        animate={{ x: 0, scaleX: 1 }}
        transition={{ ease: 'linear' }}
      ></motion.div>
      <div className="color-tools-container">
        <div className="selector-button-container">
          <div className="current-color">{color.toUpperCase()}</div>
          <button className="copy-btn" onClick={handleCopy}>
            <span className="copy-tooltip">Copy Hex</span>
            <span className="material-icons">content_copy</span>
          </button>
          <button onClick={handleSelector} className="change-color">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="lock-color" onClick={handleLock}>
            {lockedValue ? (
              <span className="material-icons locked-icon">lock</span>
            ) : (
              <span className="material-icons ">lock_open</span>
            )}
          </button>
        </div>
      </div>
      <div className="color-picker-selector">
        {isSelector && (
          <HexColorPicker color={color.toUpperCase()} onChange={setColor} />
        )}
        {isSelector && (
          <HexColorInput
            color={color.toUpperCase()}
            onChange={setColor}
            className="hex-input"
          />
        )}
      </div>
    </div>
  )
}
