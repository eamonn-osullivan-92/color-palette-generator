import React from 'react'

export default function Header() {
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
          </ul>
        </nav>
      </header>
    </>
  )
}
