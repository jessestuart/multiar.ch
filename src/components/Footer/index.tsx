import React from 'react'
import Theme from 'styles/Theme'
import { DateTime } from 'luxon'
import { Heart } from 'react-feather'

const { colors } = Theme

const Footer = () => {
  return (
    <footer
      className="bb bottom-0 bw2 f5-ns f6 flex flex-column fw4 lh-title pa4 w-100"
      style={{
        borderColor: colors.primary,
        borderTop: `1px #e4e4e4 solid`,
      }}
    >
      <div className="flex justify-center items-center">
        © 2018–{DateTime.local().year} Jesse Stuart
      </div>
      <div className="dib center tc flex-ns justify-center items-center">
        Pixels, bits and bytes hand-crafted with
        <Heart
          className="hot-pink mh1 hvr-grow"
          fill="#ff3a5c"
          height="15"
          width="15"
        />
        in NYC.
      </div>
    </footer>
  )
}

export default Footer
