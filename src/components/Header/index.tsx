import Link from 'gatsby-link'
import React, { ReactNode } from 'react'
import { Flex, Text } from 'rebass/styled-components'

const Header = ({ children }: { children: ReactNode }) => (
  <Flex
    bg="secondary"
    className="justify-center items-center center w-100 ph2 pv3"
  >
    <Link to="/" className="fw3 no-underline tracked-tight">
      <Text color="primary" fontFamily="mono" className="f1">
        {children}
      </Text>
    </Link>
  </Flex>
)

export default Header
