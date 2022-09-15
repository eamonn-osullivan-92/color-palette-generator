import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
//
import Home from './Home'
import Header from './Header'
import Palettes from './Palettes'
import Generate from './Generate'
import Register from './Register'
//
import { useCacheUser } from '../auth0-utils'
import { getUser } from '../apiClient'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'
import defaultPalettes from '../defaultPalettes'
import { randomNum } from '../../server/utils'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [heroPalette, setHeroPalette] = useState(null)
  //   const [userPalettes, setUserPalettes] = useState(null)
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const token = useSelector((state) => state.loggedInUser.token)

  //TODO: Get default palettes for background image

  useEffect(async () => {
    try {
      if (!isAuthenticated) {
        dispatch(clearLoggedInUser())
      } else {
        let token = await getAccessTokenSilently()
        let userInDb = await getUser(token)
        userInDb
          ? dispatch(updateLoggedInUser(userInDb))
          : navigate('/register')
      }
    } catch (err) {
      console.error(err)
    }
  }, [isAuthenticated])

  //   useEffect(async () => {
  //     let palettes = await getPalettes(token)
  //     setUserPalettes(palettes)
  //   }, [token])

  useEffect(() => {
    let hero = defaultPalettes[randomNum(defaultPalettes)]
    setHeroPalette(hero)
  }, [])

  return (
    <div className="main-container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={heroPalette && <Home palette={heroPalette} />}
        />
        {token && (
          <Route path="/palettes" element={<Palettes token={token} />} />
        )}
        <Route path="/generate" element={<Generate />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
