import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Palettes from './Palettes'
import { getPalettes } from '../apiClient'
import { randomNum, rgbArraytoHexArray } from '../../server/utils'
import Generate from './Generate'

function App() {
  const [palettes, setPalettes] = useState(null)
  const [heroPalette, setHeroPalette] = useState(null)

  useEffect(async () => {
    const palettesArr = await getPalettes()
    setPalettes(palettesArr)
    setHeroPalette(palettesArr[randomNum(palettesArr)])
  }, [])
  return (
    // elements not rendering
    <div className="main-container">
      {/* <Routes>
        <Route path="/home" element={<Header />} />
        <Route path="/home" element={<Home palettes={palettes} />} />
        <Route
          path="/palettes"
          element={palettes && <Palettes palettes={palettes} />}
        />
      </Routes> */}
      <Header />
      {palettes && <Home palettes={palettes} />}
      {palettes && <Palettes palettes={palettes} />}
      {palettes && <Generate palettes={palettes} />}
    </div>
  )
}

export default App
