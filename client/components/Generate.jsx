import React, { useState, useEffect } from 'react'
import { generatePalette, generateTargetedPalette } from '../apiClient'
import { randomNum, rgbArraytoHexArray, hexToRgb } from '../../server/utils'

import GeneratedColor from './GeneratedColor'

export default function Generate({ palettes }) {
  const [generatedPalette, setGeneratedPalette] = useState(null)

  const handleGenerate = async () => {
    const generate = await generatePalette()
    let hex = rgbArraytoHexArray(generate.result)
    setGeneratedPalette(hex)
  }

  const handleColorInput = (e) => {
    let newColorIndex = e.target.dataset.index
    let newPalette = [...generatedPalette]
    newPalette.splice(newColorIndex, 1, e.target.value)
    setGeneratedPalette(newPalette)
  }

  const handleTargetGenerate = async (e) => {
    e.preventDefault()

    let colorOne = hexToRgb(generatedPalette[0])
    let colorTwo = hexToRgb(generatedPalette[4])

    const targetedPalette = await generateTargetedPalette(colorOne, colorTwo)
    let targetedHex = rgbArraytoHexArray(targetedPalette.result)
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
              <GeneratedColor currentColor={color} key={color} />
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
                <label htmlFor="colorOne">First olor:</label>

                {/* <input
                  type="color"
                  name="colorOne"
                  id="colorOne"
                  className="color-picker"
                  data-index="0"
                  onChange={handleColorInput}
                  //Key value ensures defaultValue updates after generation, but
                  //   key={generatedPalette[0]}
                  defaultValue={generatedPalette[0]}
                /> */}

                <label htmlFor="colorOne">Last Color:</label>
                {/* <input
                  type="color"
                  name="colorTwo"
                  id="colorTwo"
                  className="color-picker"
                  data-index="4"
                  onChange={handleColorInput}
                  //   key={generatedPalette[4]}
                  defaultValue={generatedPalette[4]}
                /> */}
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
