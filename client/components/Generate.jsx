import React, { useState, useEffect } from 'react'
import { generateTargetedPalette } from '../apiClient'
import { rgbArraytoHexArray } from '../../server/utils'
import GeneratedColor from './GeneratedColor'

export default function Generate() {
  const [generatedPalette, setGeneratedPalette] = useState([
    '#f5f5f5',
    '#dbdbdb',
    '#7d7d7d',
    '#404040',
    '#1a1a1a',
  ])
  const [queryPalette, setQueryPalette] = useState(['N', 'N', 'N', 'N', 'N'])

  const handleLockedPalettes = (index, color = 'N') => {
    queryPalette[index] = color
    setQueryPalette(queryPalette)
  }

  const resetLockedPalettes = (newPalette) => {
    queryPalette.forEach((color, index) => {
      if (color !== 'N') {
        newPalette[index] = color
      }
    })
    return newPalette
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    const newPalette = await generateTargetedPalette(queryPalette)
    resetLockedPalettes(newPalette.result)

    let targetedHex = rgbArraytoHexArray(newPalette.result)
    setGeneratedPalette(targetedHex)
  }

  useEffect(async () => {
    const newPalette = await generateTargetedPalette(queryPalette)
    let targetedHex = rgbArraytoHexArray(newPalette.result)
    setGeneratedPalette(targetedHex)
  }, [])

  return (
    <>
      {generatedPalette && (
        <div className="generate-container">
          <div className="generate-background">
            {generatedPalette.map((color, index) => (
              <GeneratedColor
                index={index}
                currentColor={color}
                key={color}
                handleLockedPalettes={handleLockedPalettes}
              />
            ))}
          </div>
          <div className="generate-button-container">
            <button className="fetch-generate-btn btn" onClick={handleGenerate}>
              Generate
            </button>
            <button className="save-palette-btn btn">Save</button>
          </div>
        </div>
      )}
      <div className="tooltip-container">
        <h3 className="toottip-heading">How to use:</h3>
        <p>Click generate to create a random palette.</p>
        <p>
          If you have a specific color scheme in mind, you can select your
          desired colors and lock it. The position of locked colors does
          influence the generated palette so experiment with different
          positions.
        </p>

        <p>
          If you have two complimentary colors, try placing them at each end.
          Contrasting colors placed closer together will generate a more triadic
          color scheme.
        </p>

        <p>
          The generator utilises the Colormind API. For more info visit
          <a href="http://colormind.io/"> Colormind.io.</a>
        </p>
      </div>
    </>
  )
}
