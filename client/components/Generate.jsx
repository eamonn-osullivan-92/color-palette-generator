import React, { useState, useEffect } from 'react'
import { generateTargetedPalette } from '../apiClient'
import { randomNum, rgbArraytoHexArray } from '../../server/utils'
import GeneratedColor from './GeneratedColor'

export default function Generate({ palettes }) {
  const [generatedPalette, setGeneratedPalette] = useState(null)
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

  useEffect(() => {
    setGeneratedPalette(palettes[randomNum(palettes)].colors)
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
            <button className="generate" onClick={handleGenerate}>
              Generate
            </button>
          </div>
        </div>
      )}
    </>
  )
}
