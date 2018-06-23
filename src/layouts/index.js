import React from 'react'
import Helmet from 'react-helmet'

import 'js-tachyons'
import 'typeface-alegreya'
import 'typeface-space-mono'

import Header from '../components/header'
import './index.css'

type Props = {
  children: Function,
  data: {
    site: {
      siteMetadata: {
        title: string,
      },
    },
  },
}

const Layout = ({ children, data }: Props) => (
  <div>
    <Helmet title={data.site.siteMetadata.title} />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
