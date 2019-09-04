import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import React from 'react'

import { client } from './src/components/Apollo'
import { initSentry } from './src/services/sentry'
import Layout from './src/components/Layout'
import Theme from './src/styles/Theme'

const { GATSBY_ENV } = process.env

initSentry({ environment: GATSBY_ENV })

export const wrapRootElement = ({ element, props }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <Layout {...props}>{element}</Layout>
    </ThemeProvider>
  </ApolloProvider>
)
