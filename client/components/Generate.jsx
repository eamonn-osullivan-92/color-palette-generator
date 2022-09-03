import React, { useState, useEffect } from 'react'
import { generatePalette, generateTargetedPalette } from '../apiClient'
import { randomNum, rgbArraytoHexArray, hexToRgb } from '../../server/utils'

export default function Generate({ palettes }) {
  const [generatedPalette, setGeneratedPalette] = useState(null)

  const handleGenerate = async () => {
    const generate = await generatePalette()
    let hex = rgbArraytoHexArray(generate.result)
    setGeneratedPalette(hex)
  }

  const handleTargetGenerate = async (e) => {
    e.preventDefault()
    console.log(generatedPalette[0])
    console.log(generatedPalette[4])
    // getting slight variations in conversions
    let colorOne = hexToRgb(generatedPalette[0])
    let colorTwo = hexToRgb(generatedPalette[4])
    console.log(colorOne)
    console.log(colorTwo)

    const targetedPalette = await generateTargetedPalette(colorOne, colorTwo)
    let targetedHex = rgbArraytoHexArray(targetedPalette.result)
    console.log(targetedHex)
    setGeneratedPalette(targetedHex)
  }

  useEffect(() => {
    setGeneratedPalette(palettes[randomNum(palettes)].colors)
  }, [])

  return (
    <>
      {generatedPalette && (
        <div className="generate-container">
          <div className="generate-background">
            {generatedPalette.map((color, i) => (
              <div
                key={i}
                className="generate-color"
                style={{ backgroundColor: `${color}` }}
              >
                {color}
              </div>
            ))}
          </div>

          <div className="ui-panel">
            <div className="random-generate-container">
              <h2 className="random-title">Random Color Picker</h2>
              <p>Generate a random color palette</p>
              <div className="generate-button-container">
                <button onClick={handleGenerate} className="btn-small">
                  Generate
                </button>
                <form method="POST">
                  <input type="hidden" name="colors" value="" />
                  <button className="btn-small">Save</button>
                </form>
              </div>
            </div>
            <div className="target-generate-container">
              <h2 className="targeted-title">Targeted Color Picker</h2>
              <p>
                Select a start and end color and let the generator fill the gaps
              </p>
              <form>
                <label htmlFor="colorOne">First Color:</label>
                <input
                  type="color"
                  name="colorOne"
                  id="colorOne"
                  className="color-picker"
                  key={generatedPalette[0]}
                  defaultValue={generatedPalette[0]}
                />

                <label htmlFor="colorOne">Last Color:</label>
                <input
                  type="color"
                  name="colorTwo"
                  id="colorTwo"
                  className="color-picker"
                  key={generatedPalette[4]}
                  defaultValue={generatedPalette[4]}
                />
                <button onClick={handleTargetGenerate} className="btn-small">
                  Generate
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
