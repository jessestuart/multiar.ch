import Link from 'gatsby-link'
import React, { ReactNode } from 'react'
import { Flex, Text } from 'rebass'

interface Props {
  children: ReactNode
}

const Header = ({ children }: Props) => (
  <Flex bg="secondary" className="justify-center items-center center w-100 pa2">
    <Link to="/" className="fw3 no-underline tracked-tight">
      <Text color="primary" fontFamily="mono" className="ma0 mt2 f1">
        {children}
      </Text>
    </Link>
  </Flex>
)

export default Header
