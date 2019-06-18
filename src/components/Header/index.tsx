/* @flow */
import Link from 'gatsby-link'
import React from 'react'

import config from '../../../gatsby-config'

const Header = () => {
  const { title } = config
  return (
    <div
      className="pv3"
      style={{
        background: '#e5f4ee',
      }}
    >
      <div
        className="flex justify-center items-center"
        style={{
          margin: '0 auto',
          maxWidth: 960,
        }}
      >
        <h1 className="ma0 mt2 f1">
          <Link
            to="/"
            className="fw3 no-underline"
            style={{
              color: '#68465b',
              letterSpacing: '-0.15rem',
              textDecoration: 'none',
            }}
          >
            {title}
          </Link>
        </h1>
      </div>
    </div>
  )
}

export default Header
