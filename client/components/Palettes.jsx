import React, { useState, useEffect } from 'react'
import { getPalettes } from '../apiClient'

export default function Palettes({ token }) {
  const [userPalettes, setUserPalettes] = useState(null)

  useEffect(async () => {
    let palettes = await getPalettes(token)
    setUserPalettes(palettes)
  }, [])

  return (
    <div className="container">
      {userPalettes ? (
        userPalettes.map((palette, i) => (
          <div className="palette-container" key={i}>
            <h3 className="paletteName">{palette.name}</h3>
            <div className="palette">
              {palette.colors.map((color, i) => (
                <div
                  key={i}
                  className="color"
                  style={{ backgroundColor: `${color}` }}
                >
                  <div className="palette-tools-container">
                    <div className="current-color">{color.toUpperCase()}</div>

                    <button className="copy-btn">
                      <span className="copy-tooltip">Copy Hex</span>
                      <span className="material-icons">content_copy</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>
          You do not have any saved palettes. Click
          <a href="/generate"> here to try out the generator.</a>
        </div>
      )}
    </div>
  )
}
