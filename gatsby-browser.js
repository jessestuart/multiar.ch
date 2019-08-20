const { ApolloProvider } = require('react-apollo')
const { ThemeProvider } = require('styled-components')
const React = require('react')

const { client } = require('./src/components/Apollo')

const Theme = require('./src/styles/Theme').default
const Layout = require('./src/components/Layout').default

exports.wrapPageElement = ({ element, props }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <Layout {...props}>{element}</Layout>
    </ThemeProvider>
  </ApolloProvider>
)
// eslint-disable-next-line
// exports.wrapPageElement = ({ element, props }) => {
//   // props provide same data to Layout as Page element will get including
//   // location, data, etc - you don't need to pass it
//   return (
//     <ThemeProvider theme={Theme}>
//       <Layout {...props}>{element}</Layout>
//     </ThemeProvider>
//   )
// }
