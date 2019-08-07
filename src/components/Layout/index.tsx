import 'js-tachyons'
import 'typeface-lato'
import 'typeface-space-mono'

import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'
import { Box } from 'rebass'

import Header from 'components/Header'
import { useSiteMetadata } from 'utils/hooks'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const siteMetadata = useSiteMetadata()
  const { title } = siteMetadata
  return (
    <>
      <Helmet title={title} />
      <Header>{title}</Header>
      <Box className="f3 w-100-ns ma4 ma0-ns lh-copy">{children}</Box>
    </>
  )
}

export default Layout
