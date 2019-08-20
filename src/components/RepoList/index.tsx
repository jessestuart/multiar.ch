import { useQuery } from '@apollo/react-hooks'
import { graphql, useStaticQuery } from 'gatsby'
import { DockerHubRepo } from 'gatsby-source-docker-hub'
import gql from 'graphql-tag'
import _ from 'lodash'
import fp from 'lodash/fp'
import React from 'react'

import PureRepoList from 'components/RepoList/PureRepoList'

const { DateTime } = require('luxon')

const DOCKER_HUB_QUERY = gql`
  query DockerHubRepos($username: String!) {
    allDockerHubRepo(username: $username) {
      edges {
        node {
          architectures
          description
          lastUpdated
          name
          pullCount
          starCount
        }
      }
    }
  }
`

const parseRepos: (edges: any) => DockerHubRepo[] = _.flow(
  fp.get('allDockerHubRepo.edges.node'),
  fp.filter((repo: DockerHubRepo) => {
    const lastUpdated =
      typeof repo.lastUpdated === 'string'
        ? DateTime.fromISO(repo.lastUpdated).diffNow().milliseconds
        : DateTime.fromJSDate(repo.lastUpdated).diffNow().milliseconds
    const oneYearInMilliseconds = -31540000000
    // Only return repos that have been updated in the last year, and that
    // support more than one architecture.
    return lastUpdated > oneYearInMilliseconds && _.size(repo.architectures) > 1
  }),
)

const RepoList = () => {
  const { error, data } = useQuery(DOCKER_HUB_QUERY, {
    pollInterval: 1000,
    variables: { username: 'jessestuart' },
  })
  if (error) {
    console.error(error)
    return
  }

  const initialData = useStaticQuery(graphql`
    {
      allDockerHubRepo {
        edges {
          node {
            architectures
            description
            id
            lastUpdated
            name
            pullCount
            starCount
          }
        }
      }
    }
  `)

  // console.log(Object.keys(data))

  const initialRepos: DockerHubRepo[] = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
    node => {
      console.log('node: ', { node })
      return node
    },
    // fp.filter(repo => {
    //   const lastUpdated =
    //     typeof repo.lastUpdated === 'string'
    //       ? DateTime.fromISO(repo.lastUpdated).diffNow().milliseconds
    //       : DateTime.fromJSDate(repo.lastUpdated).diffNow().milliseconds
    //   const oneYearInMilliseconds = -31540000000
    //   // Only return repos that have been updated in the last year, and that
    //   // support more than one architecture.
    //   return (
    //     lastUpdated > oneYearInMilliseconds && _.size(repo.architectures) > 1
    //   )
    // }),
  )(data)

  const repos = _.get(data, 'allDockerHubRepo.edges.node')
  console.log({ repos })

  if (_.isEmpty(_.compact(repos))) {
    return null
  }

  return <PureRepoList repos={repos} />
}

export default RepoList
