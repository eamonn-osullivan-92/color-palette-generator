import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
//
import Home from './Home'
import Header from './Header'
import Palettes from './Palettes'
import Generate from './Generate'
import Register from './Register'
//
import { useCacheUser } from '../auth0-utils'
import { getPalettes, getUser } from '../apiClient'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [palettes, setPalettes] = useState(null)
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  useEffect(async () => {
    const palettesArr = await getPalettes()
    setPalettes(palettesArr)
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          userInDb
            ? dispatch(updateLoggedInUser(userInDb))
            : navigate('/register')
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])

  return (
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
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
