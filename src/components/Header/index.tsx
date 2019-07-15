import Link from 'gatsby-link'
import React from 'react'
import { Flex, Text } from 'rebass'

const Header = ({ title }: { title: string }) => {
  return (
    <Flex bg="secondary">
      <div className="justify-center items-center center mw7">
        <h1 className="ma0 mt2 f1">
          <Link
            to="/"
            className="fw3 no-underline"
            style={{
              letterSpacing: '-0.15rem',
              textDecoration: 'none',
            }}
          >
            <Text color="primary" fontFamily="mono">
              {title}
            </Text>
          </Link>
        </h1>
      </div>
    </Flex>
  )
}

export default Header
