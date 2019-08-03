import React from 'react'

import RepoList from 'components/RepoList'
import SubHeader from 'components/SubHeader'

const IndexPage = () => {
  // const [data, setData] = useState()

  // useEffect(() => {
  //   const fetchRepos = async () => {
  //     if (!_.isEmpty(data)) {
  //       return
  //     }
  //     let repos: any[]
  //     if (process.env.NODE_ENV === 'development') {
  //       repos = require('../assets/dh-fixtures.json')
  //     } else {
  //       repos = await queryRepos()
  //     }
  //     setData(repos)
  //   }
  //   fetchRepos()
  // }, [data])

  return (
    <>
      <SubHeader />
      <RepoList />
    </>
  )
}

export default IndexPage
