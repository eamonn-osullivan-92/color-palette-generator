import React from 'react'

export default function Tooltip() {
  return (
    <div className="tooltip-container">
      <h3 className="toottip-heading">How to use:</h3>
      <p>Click generate to create a random palette.</p>
      <p>
        If you have a specific color scheme in mind, you can select your desired
        colors and lock it. The position of locked colors does influence the
        generated palette so experiment with different positions.
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
  )
}
