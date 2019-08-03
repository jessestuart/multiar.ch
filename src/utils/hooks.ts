import { graphql, useStaticQuery } from 'gatsby'
import _ from 'lodash'
import { useEffect } from 'react'

import { queryRepos } from 'services/docker-hub'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  )
  return site.siteMetadata
}

export const useDockerHub = ({ data, setData }) => {
  useEffect(() => {
    const fetchRepos = async () => {
      if (!_.isEmpty(data)) {
        return
      }
      let repos: any[]
      if (process.env.NODE_ENV === 'development') {
        repos = require('../assets/dh-fixtures.json')
      } else {
        repos = await queryRepos()
      }
      setData(repos)
    }
    fetchRepos()
  }, [data, setData])
}
