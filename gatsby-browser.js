const { ApolloProvider } = require('@apollo/react-hooks')
const { ThemeProvider } = require('styled-components')
const React = require('react')

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
