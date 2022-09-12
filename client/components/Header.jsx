import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Header() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <>
      <header className="header">
        <h1 className="main-title">Colour Palettes</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="list-item">
              <a href="/">Home</a>
            </li>
            <li className="list-item">
              <a href="/palettes">Palettes</a>
            </li>
            <li className="list-item">
              <a href="/generate">Generate</a>
            </li>
            <li className="list-item">
              <IfAuthenticated>
                <a href="/" onClick={handleLogOff}>
                  Log Out
                </a>
              </IfAuthenticated>
              <IfNotAuthenticated>
                <a href="/" onClick={handleSignIn}>
                  Sign In
                </a>
              </IfNotAuthenticated>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
