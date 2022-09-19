import React from 'react'

import { hexToHSL } from '../../server/utils'

export default function Template({ palette }) {
  const findDarkest = () => {
    // converts hex to hsl, and finds the lowest luminosity value
    let luminocityArray = palette.map((hex) => {
      return hexToHSL(hex)
    })
    let small = luminocityArray[0]
    for (let i = 1; i < luminocityArray.length; i++) {
      if (i == 2) {
        continue
      } else if (luminocityArray[i] < small) {
        small = luminocityArray[i]
      }
    }
    return palette[luminocityArray.indexOf(small)]
  }
  const findLightest = () => {
    // converts hex to hsl, and finds the highest luminosity value
    let luminocityArray = palette.map((hex) => {
      return hexToHSL(hex)
    })
    let big = luminocityArray[0]
    for (let i = 1; i < luminocityArray.length; i++) {
      if (i == 2) {
        continue
      } else if (luminocityArray[i] > big) {
        big = luminocityArray[i]
      }
    }
    return palette[luminocityArray.indexOf(big)]
  }
  let main = palette[2]
  let darkColor = findDarkest()
  let lightColor = findLightest()

  return (
    <div className="template-container">
      {darkColor && lightColor && (
        <div
          className="template-card-container"
          style={{
            backgroundColor: lightColor,
          }}
        >
          <div className="heading-container">
            <h4
              className="template-title"
              style={{
                color: `${main}`,
                borderBottom: `1px solid ${main}`,
              }}
            >
              Lorem Ipsum
            </h4>
            <p className="template-subtitle">
              dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <p className="template-content">
            Dignissimos harum, mollitia temporibus ipsum veritatis perferendis
            itaque quae cum inventore, dolor exercitationem officiis tempore
            architecto natus nam enim.
          </p>
          <div className="template-button-container">
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: main,
                borderColor: main,
                color: lightColor,
              }}
            >
              Buy Now
            </button>
            <button
              className="btn"
              style={{
                borderColor: main,
                backgroundColor: lightColor,
                color: main,
              }}
            >
              More Info
            </button>
          </div>
        </div>
      )}
      <p className="template-disclaimer">
        Note: the UI setting will produce better results for the above template.
        Default can be less predictable.
      </p>
    </div>
  )
}
