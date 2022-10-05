import React from 'react'

import Palette from './Palette'

export default function Palettes({ palettes, token, setUserPalettes }) {
  return (
    <div className="container">
      {palettes ? (
        palettes.map((palette) => (
          <Palette
            palette={palette}
            token={token}
            setUserPalettes={setUserPalettes}
            key={palette.name}
          />
        ))
      ) : (
        <div>
          You do not have any saved palettes. Click
          <a href="/"> here to try out the generator.</a>
        </div>
      )}
    </div>
  )
}
