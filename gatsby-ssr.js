const React = require('react')
const { ApolloProvider } = require('@apollo/react-hooks')
const { ThemeProvider } = require('styled-components')

const { initSentry } = require('./src/services/sentry')

const { GATSBY_ENV } = process.env

initSentry({ environment: GATSBY_ENV })

require('typeface-alegreya')
require('typeface-fira-mono')
require('typeface-nunito')

const client = require('./src/components/Apollo')

const Theme = require('./src/styles/Theme').default
const Layout = require('./src/components/Layout').default

exports.wrapPageElement = ({ element, props }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <Layout {...props}>{element}</Layout>
    </ThemeProvider>
  </ApolloProvider>
)
