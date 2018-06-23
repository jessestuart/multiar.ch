/* @flow */
import React from 'react'
import Link from 'gatsby-link'

type Props = {
  siteTitle: string,
}

const Header = ({ siteTitle }: Props) => {
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
              textDecoraction: 'none',
              color: '#68465b',
              letterSpacing: '-0.15rem',
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </div>
  )
}

export default Header
