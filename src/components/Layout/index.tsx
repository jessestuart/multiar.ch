import 'js-tachyons'
import 'typeface-alegreya'
import 'typeface-space-mono'

import './index.css'

import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'

import Header from 'components/Header'
import { useSiteMetadata } from 'utils/hooks'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { title } = useSiteMetadata()
  return (
    <div>
      <Helmet title={title} />
      <Header />
      <div
        className="f3 w-100-ns ma4 ma0-ns"
        style={{
          lineHeight: '2rem',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Layout
