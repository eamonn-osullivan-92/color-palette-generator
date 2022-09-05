import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Palettes from './Palettes'
import { getPalettes } from '../apiClient'
import Generate from './Generate'

function App() {
  const [palettes, setPalettes] = useState(null)

  useEffect(async () => {
    const palettesArr = await getPalettes()
    setPalettes(palettesArr)
  }, [])
  return (
    // elements not rendering
    <div className="main-container">
      <Header />
      <Routes>
        <Route path="/" element={palettes && <Home palettes={palettes} />} />
        <Route
          path="/palettes"
          element={palettes && <Palettes palettes={palettes} />}
        />
        <Route
          path="/generate"
          element={palettes && <Generate palettes={palettes} />}
        />
      </Routes>
    </div>
  )
}

export default App
