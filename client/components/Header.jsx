import React from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

import { signOut } from 'firebase/auth'
import { auth } from '../../server/firebase.config'
import { useNavigate } from 'react-router'

export default function Header() {
  const user = auth.currentUser
  const navigate = useNavigate()

  const logout = async () => {
    await signOut(auth)
  }

  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    navigate('/signin')
  }

  return (
    <>
      <header className="header">
        <h1 className="main-title">Colorful Life</h1>
        <nav className="nav">
          <ul className="nav-list">
            {/* <IfAuthenticated>
              <li className="list-item">
                <a href="/">Home</a>
              </li>
              <li className="list-item">
                <a href="/palettes">Palettes</a>
              </li>
              <li className="list-item">
                <a href="/" onClick={handleLogOff}>
                  Log Out
                </a>
              </li>
            </IfAuthenticated>
            <IfNotAuthenticated>
              <li className="list-item">
                <a href="/">Home</a>
              </li>
              <li className="list-item">
                <a href="/" onClick={handleSignIn}>
                  Sign In
                </a>
              </li>
            </IfNotAuthenticated> */}
            {user ? (
              <>
                <li className="list-item">
                  <a href="/">Home</a>
                </li>
                <li className="list-item">
                  <a href="/palettes">Palettes</a>
                </li>
                <li className="list-item">
                  <a href="/" onClick={handleLogOff}>
                    Log Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="list-item">
                  <a href="/">Home</a>
                </li>
                <li className="list-item">
                  <a href="/" onClick={handleSignIn}>
                    Sign In
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  )
}
