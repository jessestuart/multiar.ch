/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
const React = require('react')

require('typeface-alegreya')
require('typeface-fira-mono')
require('typeface-nunito')

const Theme = require('./src/styles/Theme').default

const Layout = require('./src/components/Layout').default

const { ThemeProvider } = require('styled-components')

// eslint-disable-next-line
exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get including
  // location, data, etc - you don't need to pass it
  return (
    <ThemeProvider theme={Theme}>
      <Layout {...props}>{element}</Layout>
    </ThemeProvider>
  )
}
