import React, { useEffect } from 'react'
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
import { getUser } from '../apiClient'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const token = useSelector((state) => state.loggedInUser.token)

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
        {token && (
          <Route path="/palettes" element={<Palettes token={token} />} />
        )}

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
