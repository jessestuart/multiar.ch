import React, { ReactNode } from 'react'
import { Flex, Link, Text } from 'rebass/styled-components'

import GitHubIcon from 'components/Icons/Github'

const Header = ({ children }: { children: ReactNode }) => (
  <Flex
    bg="secondary"
    className="items-center justify-center ph2 pv1 pv3-ns"
    flexDirection="column"
  >
    <Link href="/" className="no-underline">
      <Text
        color="primary"
        fontFamily="mono"
        className="f1-ns f2 fw5 tracked-tight"
      >
        {children}
      </Text>
    </Link>
    <Text fontFamily="sans" className="f5 lh-title">
      A collection of mulitarch container images,
      <br />
      curated and maintained by{' '}
      <Link href="https://jesses.io" className="fw6" color="primary">
        Jesse Stuart
      </Link>
      .
    </Text>
    <Link
      href="https://github.com/jessestuart/multiar.ch"
      className="absolute hvr-grow"
      style={{ right: 16, top: 16 }}
    >
      <GitHubIcon width={48} height={48} />
    </Link>
  </Flex>
)

export default Header
