import { useQuery } from '@apollo/react-hooks'
import { Architecture, DockerHubRepo } from 'docker-hub-utils'
import { graphql, useStaticQuery } from 'gatsby'
import gql from 'graphql-tag'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'

import PureRepoList from 'components/RepoList/PureRepoList'
import log from 'utils/log'

export const DOCKER_HUB_QUERY = gql`
  {
    repos(username: "jessestuart") {
      description
      lastUpdated
      name
      pullCount
      starCount
    }
  }
`

const GATSBY_SOURCE_GRAPHQL_QUERY = graphql`
  {
    allDockerHubRepo {
      edges {
        node {
          description
          id
          lastUpdated
          name
          pullCount
          starCount
          manifestList {
            manifests {
              platform {
                architecture
              }
            }
          }
        }
      }
    }
  }
`

let reposToArchitectureMap: { [repoName: string]: Architecture[] }

export const getReposToArchitecturesMap = _.once((repos: DockerHubRepo[]) => {
  reposToArchitectureMap = _.reduce(
    repos,
    (acc, repo: DockerHubRepo) => ({
      ...acc,
      [repo.name]: _.flow(
        fp.get('manifestList.manifests'),
        fp.map('platform.architecture'),
      )(repo),
    }),
    {},
  )
  return reposToArchitectureMap
})

const filterReposByDate = _.flow(
  fp.filter((repo: DockerHubRepo) => {
    const lastUpdatedTimestamp: number = DateTime.fromISO(
      repo.lastUpdated.toString(),
    ).diffNow().milliseconds
    const oneYearInMilliseconds = -31540000000
    // Only return repos that have been updated in the last year, and that
    // support more than one architecture.
    return lastUpdatedTimestamp > oneYearInMilliseconds
  }),
  fp.compact,
)

const filterReposByManifestList = _.flow(
  fp.filter((repo: DockerHubRepo) => {
    const numArchitectures = _.size(reposToArchitectureMap[repo.name])
    return numArchitectures > 1
  }),
)

const RepoList = ({ pollInterval }: { pollInterval?: number | undefined }) => {
  const initialData = useStaticQuery(GATSBY_SOURCE_GRAPHQL_QUERY)
  const repos: DockerHubRepo[] = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
  )(initialData)
  const repoToArchitecturesMap = getReposToArchitecturesMap(repos)
  const initialRepos = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
    filterReposByDate,
    filterReposByManifestList,
  )(initialData)

  const { error, data } = useQuery(DOCKER_HUB_QUERY, { pollInterval })
  if (error) {
    log.error(error)
  }

  const updatedRepos: DockerHubRepo[] | undefined = _.flow(
    fp.get('repos'),
    filterReposByDate,
    filterReposByManifestList,
  )(data)

  return (
    <PureRepoList
      repos={_.isEmpty(updatedRepos) ? initialRepos : updatedRepos}
      repoToArchitecturesMap={repoToArchitecturesMap}
    />
  )
}

export default RepoList
