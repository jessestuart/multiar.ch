import React from 'react'
import { Flex } from 'reflexbox'

import Footer from 'components/Footer'
import Header from 'components/Header'
import RepoList from 'components/RepoList'
import SubHeader from 'components/SubHeader'
import { useSiteMetadata } from 'utils/hooks'

const IndexPage = () => {
  const { title } = useSiteMetadata()
  return (
    <>
      <Header>{title}</Header>
      <Flex className="w-90 w-100-ns" flexDirection="column">
        <RepoList />
        <SubHeader />
        <Footer />
      </Flex>
    </>
  )
}

export default IndexPage
