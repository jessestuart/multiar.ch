import { DateTime } from 'luxon'
import React from 'react'
import { Heart } from 'react-feather'
import Theme from 'styles/Theme'

const { colors } = Theme

const Footer = () => {
  return (
    <footer
      className="bb bottom-0 bw2 f5-ns f6 flex flex-column fw4 lh-title pa4 w-100"
      style={{
        borderBottomColor: colors.primary,
        borderTop: `1px #e4e4e4 solid`,
      }}
    >
      <div className="flex justify-center items-center">
        © 2018–{DateTime.local().year}{' '}
        <a
          href="https://jesses.io/"
          className="pl1 no-underline b"
          style={{ color: 'rgba(0, 0, 0, 0.80)' }}
        >
          Jesse Stuart
        </a>
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
