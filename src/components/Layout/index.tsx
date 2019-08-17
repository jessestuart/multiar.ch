import 'js-tachyons'

import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'
import { Flex } from 'reflexbox'

import { useSiteMetadata } from 'utils/hooks'

const Layout = ({ children }: { children: ReactNode }) => {
  const { title } = useSiteMetadata()
  return (
    <>
      <Helmet title={title} />
      <Flex flexDirection="column" className="f3 ma4 ma0-ns lh-copy">
        {children}
      </Flex>
    </>
  )
}

export default Layout
