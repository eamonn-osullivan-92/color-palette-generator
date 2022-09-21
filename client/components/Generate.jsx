import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { generateTargetedPalette } from '../apiClient'
import { rgbArraytoHexArray } from '../../server/utils'
import GeneratedColor from './GeneratedColor'
import Tooltip from './Tooltip'
import SaveForm from './SaveForm'
import Template from './Template'

export default function Generate() {
  const userId = useSelector((redux) => redux.loggedInUser.auth0Id)
  const [generatedPalette, setGeneratedPalette] = useState([
    '#f5f5f5',
    '#dbdbdb',
    '#7d7d7d',
    '#404040',
    '#1a1a1a',
  ])
  const [queryPalette, setQueryPalette] = useState(['N', 'N', 'N', 'N', 'N'])
  const [userInputPalette, setUserInputPalette] = useState([
    null,
    null,
    null,
    null,
    null,
  ])
  const [lockedPalettes, setLockedPalettes] = useState([
    false,
    false,
    false,
    false,
    false,
  ])
  const [queryMode, setQueryMode] = useState('ui')
  const [isSave, setIsSave] = useState(false)
  // register user selected colors to be used when saving palettes. React-colorful hex picker does not allow the generated palette variable to be changed when updating colors.

  const handleLockedPaletteArray = (colorLockValue, index) => {
    // updates an array of locked values for each color. This value is passed through as a prop to update each color with the correct lock value on re-render.
    let lockedArray = [...lockedPalettes]
    lockedArray[index] = colorLockValue
    setLockedPalettes(lockedArray)
  }

  const handleQueryPalette = (index, color = 'N') => {
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
    // sending query with only 'N' values limits the color responses - the below logic is to send a query palette only when certain colors are locked.
    let searchPalette
    queryPalette.find((elm) => elm !== 'N')
      ? (searchPalette = queryPalette)
      : null
    const newPalette = await generateTargetedPalette(searchPalette, queryMode)
    resetLockedPalettes(newPalette.result)
    let hexArray = rgbArraytoHexArray(newPalette.result)
    setGeneratedPalette(hexArray)
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
                lockedValue={lockedPalettes[index]}
                handleLockedPaletteArray={handleLockedPaletteArray}
                setLockedPalettes={setLockedPalettes}
                handleQueryPalette={handleQueryPalette}
                handleUserInputPalettes={handleUserInputPalettes}
              />
            ))}
          </div>
          <div className="generate-button-container">
            <button className="btn btn-primary" onClick={handleGenerate}>
              Generate
            </button>
            {userId && (
              <button className=" btn" onClick={handleIsSave}>
                Save
              </button>
            )}
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
      <div className="container-flex-row">
        <Tooltip />
        <Template palette={generatedPalette} />
      </div>
    </>
  )
}
