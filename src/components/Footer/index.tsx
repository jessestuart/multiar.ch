import { DateTime } from 'luxon'
import React from 'react'
import { Heart } from 'react-feather'
import { colors } from 'styles/Theme'

const Footer = () => {
  return (
    <footer
      className="bb bottom-0 bw2 f5-ns f6 flex flex-column fw4 lh-title pa4 w-100"
      style={{
        borderBottomColor: colors.primary,
        borderTop: `1px ${colors.neutral} solid`,
      }}
    >
      <div className="flex justify-center items-center">
        © 2018–{DateTime.local().year}{' '}
        <a
          href="https://jesses.io/"
          className="pl1 b"
          style={{ color: colors.text }}
        >
          Jesse Stuart
        </a>
      </div>
      <div className="dib center tc flex-ns justify-center items-center">
        Pixels, bits and bytes hand-crafted with
        <Heart
          className="hot-pink mh1"
          fill={colors.hotPink}
          height="15"
          width="15"
        />
        in NYC.
      </div>
    </footer>
  )
}

export default Footer
