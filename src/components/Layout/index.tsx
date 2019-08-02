import 'js-tachyons'
import 'typeface-lato'
import 'typeface-space-mono'

import React, { Fragment, ReactNode } from 'react'
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
    <Fragment>
      <Helmet title={title} />
      <Header title={title} />
      <Box className="f3 w-100-ns ma4 ma0-ns lh-copy">{children}</Box>
    </Fragment>
  )
}

export default Layout
