import React, { useState, useEffect } from 'react'

import { generateTargetedPalette } from '../apiClient'
import { rgbArraytoHexArray } from '../../server/utils'
import GeneratedColor from './GeneratedColor'
import Tooltip from './Tooltip'
import SaveForm from './SaveForm'
import Template from './Template'

export default function Generate() {
  const [generatedPalette, setGeneratedPalette] = useState([
    '#f5f5f5',
    '#dbdbdb',
    '#7d7d7d',
    '#404040',
    '#1a1a1a',
  ])
  const [queryPalette, setQueryPalette] = useState(['N', 'N', 'N', 'N', 'N'])
  const [queryMode, setQueryMode] = useState('default')
  const [isSave, setIsSave] = useState(false)
  const [userInputPalette, setUserInputPalette] = useState([
    null,
    null,
    null,
    null,
    null,
  ])

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
    // sending query with only 'N' values limits the color responses, so the below logic is to send a query palette only when certain colors are locked.
    let searchPalette
    queryPalette.find((elm) => elm !== 'N')
      ? (searchPalette = queryPalette)
      : null
    const newPalette = await generateTargetedPalette(searchPalette, queryMode)
    resetLockedPalettes(newPalette.result)

    let targetedHex = rgbArraytoHexArray(newPalette.result)
    setGeneratedPalette(targetedHex)
  }

  const handleIsSave = () => {
    setIsSave((prevState) => !prevState)
  }

  const handleUserInputPalettes = (color, index) => {
    let updated = [...userInputPalette]
    updated[index] = color
    setUserInputPalette(updated)
  }

  useEffect(async () => {
    const newPalette = await generateTargetedPalette(null, queryMode)
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
                handleUserInputPalettes={handleUserInputPalettes}
              />
            ))}
          </div>
          <div className="generate-button-container">
            <button className="fetch-generate-btn btn" onClick={handleGenerate}>
              Generate
            </button>
            <button className="save-palette-btn btn" onClick={handleIsSave}>
              Save
            </button>

            <div className="radio-control">
              <input
                className="radio"
                type="radio"
                value="default"
                name="mode"
                checked={queryMode == 'default'}
                onChange={(e) => setQueryMode(e.target.value)}
              />{' '}
              Default
              <input
                className="radio"
                type="radio"
                value="ui"
                name="mode"
                checked={queryMode == 'ui'}
                onChange={(e) => setQueryMode(e.target.value)}
              />{' '}
              UI
            </div>
          </div>
          {isSave && (
            <SaveForm
              userPalette={userInputPalette}
              generatedPalette={generatedPalette}
              setIsSave={setIsSave}
            />
          )}
        </div>
      )}
      <Tooltip />
      <Template palette={generatedPalette} />
    </>
  )
}
