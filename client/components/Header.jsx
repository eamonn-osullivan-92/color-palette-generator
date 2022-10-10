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
        <h1 className="main-title">Colorful Life</h1>
        <nav className="nav">
          <ul className="nav-list">
            <IfAuthenticated>
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
            </IfNotAuthenticated>
          </ul>
        </nav>
      </header>
    </>
  )
}
