import React, { useEffect, useState } from 'react'

export default function Palettes({ userPalettes }) {
  return (
    <div className="container">
      {userPalettes ? (
        userPalettes.map((palette, i) => (
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
