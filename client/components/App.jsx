import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import { getPalettes } from '../apiClient'
import { randomNum } from '../../server/utils'

function App() {
  const [palettes, setPalettes] = useState([])
  const [heroPalette, setHeroPalette] = useState(null)

  useEffect(async () => {
    const palettesArr = await getPalettes()
    console.log(palettesArr)
    setPalettes(palettesArr)
    setHeroPalette(palettesArr[randomNum(palettesArr)])
  }, [])

  return (
    <div className="main-container">
      <Routes>
        <Route path="/home" element={<Header />} />

        <Route
          path="/home"
          element={heroPalette && <Home heroPalette={heroPalette} />}
        />
      </Routes>
    </div>
  )
}

export default App
