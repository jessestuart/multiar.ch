import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import React from 'react'
import { Flex } from 'reflexbox'

import Footer from 'components/Footer'
import Header from 'components/Header'
import RepoList from 'components/RepoList'
import SubHeader from 'components/SubHeader'
import { useSiteMetadata } from 'utils/hooks'

const client = new ApolloClient({
  fetch,
  uri: 'https://dh.jesses.dev/api/',
})

const IndexPage = () => {
  const { title } = useSiteMetadata()
  return (
    <>
      <ApolloProvider client={client}>
        <Header>{title}</Header>
        <Flex className="w-90 w-100-ns" flexDirection="column">
          <RepoList />
          <SubHeader />
          <Footer />
        </Flex>
      </ApolloProvider>
    </>
  )
}

export default IndexPage
