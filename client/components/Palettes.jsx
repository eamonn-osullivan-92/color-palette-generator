import React from 'react'

export default function Palettes({ palettes }) {
  return (
    <div className="container">
      {palettes.map((palette, i) => (
        <div className="palette" key={i}>
          {palette.colors.map((color, i) => (
            <div
              key={i}
              className="color"
              style={{ backgroundColor: `${color}` }}
            >
              {color}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
