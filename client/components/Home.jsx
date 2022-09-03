import React from 'react'
import { randomNum } from '../../server/utils'

export default function Home({ palettes }) {
  const heroPalette = palettes[randomNum(palettes)]
  return (
    <div className="hero-container">
      <div className="hero-background">
        {heroPalette.colors.map((color, i) => (
          <div
            className="hero-color"
            key={i}
            style={{ backgroundColor: `${color}` }}
          ></div>
        ))}
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Create your next color palette with ease</h1>

        <div className="button-container">
          <a href="/generate">
            <button className="generate-btn btn">Generate</button>
          </a>
          <a href="/palettes">
            <button className="palettes-btn btn">Palettes</button>
          </a>
        </div>
      </div>
    </div>
  )
}
