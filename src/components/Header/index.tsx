import Link from 'gatsby-link'
import React, { ReactNode } from 'react'
import { Flex, Text } from 'rebass/styled-components'

const Header = ({ children }: { children: ReactNode }) => (
  <Flex bg="secondary" className="items-center justify-center ph2 pv1 pv3-ns">
    <Link to="/" className="no-underline">
      <Text
        color="primary"
        fontFamily="mono"
        className="f1-ns f2 fw3 tracked-tight"
      >
        {children}
      </Text>
    </Link>
  </Flex>
)

export default Header
