import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../server/firebase.config'
//
import Header from './Header'
import Palettes from './Palettes'
import Generate from './Generate'
import SignIn from './SignIn'
import Register from './Register'
//
import { getPalettes } from '../apiClient'

function App() {
  const user = auth.currentUser
  const [userPalettes, setUserPalettes] = useState(null)

  useEffect(() => {
    user &&
      auth.currentUser
        .getIdToken()
        .then((idToken) => getPalettes(idToken))
        .then((palettes) => setUserPalettes(palettes))
        .catch((err) => {
          console.log(err.message)
        })
  }, [user])

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
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
