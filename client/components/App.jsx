import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

//
import Header from './Header'
import Palettes from './Palettes'
import Generate from './Generate'
import Register from './Register'
//
import { useCacheUser } from '../auth0-utils'
import { getUser, getPalettes } from '../apiClient'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const user = useSelector((state) => state.loggedInUser)
  const [userPalettes, setUserPalettes] = useState(null)

  useEffect(() => {
    user &&
      getPalettes(user.token).then((palettes) => {
        setUserPalettes(palettes)
      })
  }, [user, userPalettes])

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

  return (
    <div className="main-container">
      <Header />
      <Routes>
        <Route path="/" element={<Generate />} />
        <Route
          path="/palettes"
          element={
            <Palettes
              palettes={userPalettes}
              setUserPalettes={setUserPalettes}
              token={user.token}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
