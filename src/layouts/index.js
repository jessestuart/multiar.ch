import React from 'react'
import Helmet from 'react-helmet'

import 'js-tachyons'
import 'typeface-alegreya'
import 'typeface-space-mono'

import Header from '../components/Header'
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
      className="f3 w-100-ns ma4 ma0-ns"
      style={{
        lineHeight: '2rem',
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
