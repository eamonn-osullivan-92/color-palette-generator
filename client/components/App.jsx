import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Home from './Home'
import Header from './Header'
import Palettes from './Palettes'
import Generate from './Generate'

import { getPalettes } from '../apiClient'

function App() {
  useCacheUser()
  const [palettes, setPalettes] = useState(null)
  const navigate = useNavigate()
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

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
