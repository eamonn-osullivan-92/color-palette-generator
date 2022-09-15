import React from 'react'

export default function Home({ palette }) {
  return (
    <div className="hero-container">
      <div className="hero-background">
        {palette.map((color, i) => (
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
