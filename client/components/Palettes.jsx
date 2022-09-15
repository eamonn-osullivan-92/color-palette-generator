import React, { useState, useEffect } from 'react'
import { getPalettes } from '../apiClient'
import Palette from './Palette'

export default function Palettes({ token }) {
  const [userPalettes, setUserPalettes] = useState(null)

  useEffect(async () => {
    let palettes = await getPalettes(token)
    setUserPalettes(palettes)
  }, [])

  return (
    <div className="container">
      {userPalettes ? (
        userPalettes.map((palette) => (
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
          <a href="/generate"> here to try out the generator.</a>
        </div>
      )}
    </div>
  )
}
