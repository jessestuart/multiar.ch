import { useQuery } from '@apollo/react-hooks'
import { DockerHubRepo } from 'docker-hub-utils'
import { graphql, useStaticQuery } from 'gatsby'
import gql from 'graphql-tag'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'

import PureRepoList from 'components/RepoList/PureRepoList'
import {
  getArchitecturesForRepo,
  getReposToArchitecturesMap,
} from 'utils/repos'

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

/**
 *  Filter by repos that have been updated in the last year.
 */
const filterReposByDate = _.flow(
  fp.filter((repo: DockerHubRepo) => {
    const lastUpdatedTimestamp: number = DateTime.fromISO(
      repo.lastUpdated.toString(),
    ).diffNow().milliseconds
    const oneYearInMilliseconds = -31540000000
    return lastUpdatedTimestamp > oneYearInMilliseconds
  }),
  fp.compact,
)

const filterReposByPullCount = fp.filter(
  (repo: DockerHubRepo) => repo.pullCount >= 1000,
)

/**
 * Filter by repos that support more than one architecture.
 */
const filterReposByManifestList = fp.filter(
  (repo: DockerHubRepo) => _.size(getArchitecturesForRepo(repo)) > 1,
)

export interface PullCountMap {
  [repoName: string]: number
}

export const getInitialRepoPullCountMap = fp.reduce(
  (acc: PullCountMap, repo: DockerHubRepo) => ({
    ...acc,
    [repo.name]: repo.pullCount,
  }),
  {},
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
    filterReposByPullCount,
    filterReposByManifestList,
  )(initialData)

  const { data } = useQuery(DOCKER_HUB_QUERY, { pollInterval })

  const updatedRepos: DockerHubRepo[] | undefined = _.flow(
    fp.get('repos'),
    filterReposByDate,
    filterReposByPullCount,
    filterReposByManifestList,
  )(data)

  const initialRepoPullCount = getInitialRepoPullCountMap(initialRepos)

  return (
    <PureRepoList
      initialRepoPullCount={initialRepoPullCount}
      repos={_.isEmpty(updatedRepos) ? initialRepos : updatedRepos}
      repoToArchitecturesMap={repoToArchitecturesMap}
    />
  )
}

export default RepoList
