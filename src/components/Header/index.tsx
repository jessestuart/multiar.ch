import Link from 'gatsby-link'
import React from 'react'
import { Flex, Text } from 'rebass'

const Header = ({ title }: { title: string }) => {
  return (
    <Flex bg="secondary" className="justify-center items-center center w-100">
      <Link to="/" className="fw3 no-underline tracked-tight">
        <Text color="primary" fontFamily="mono" className="ma0 mt2 f1">
          {title}
        </Text>
      </Link>
    </Flex>
  )
}

export default Header
