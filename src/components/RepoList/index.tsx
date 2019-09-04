import { useQuery } from '@apollo/react-hooks'
import { DockerHubRepo } from 'docker-hub-utils'
import gql from 'graphql-tag'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'

import PureRepoList from 'components/RepoList/PureRepoList'
import { useDockerHubSource } from 'utils/hooks'
import log from 'utils/log'

const DOCKER_HUB_QUERY = gql`
  {
    repos(username: "jessestuart") {
      description
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
`

const parseRepos: (repos: DockerHubRepo[]) => DockerHubRepo[] = _.flow(
  fp.filter((repo: DockerHubRepo) => {
    const lastUpdated =
      typeof repo.lastUpdated === 'string'
        ? DateTime.fromISO(repo.lastUpdated).diffNow().milliseconds
        : DateTime.fromJSDate(repo.lastUpdated).diffNow().milliseconds
    const oneYearInMilliseconds = -31540000000
    const numArchitectures = _.flow(
      fp.get('manifestList.manifests'),
      fp.map('platform.architecture'),
      fp.size,
    )(repo)
    // Only return repos that have been updated in the last year, and that
    // support more than one architecture.
    return lastUpdated > oneYearInMilliseconds && numArchitectures > 1
  }),
  fp.compact,
)

const RepoList = () => {
  const initialData = useDockerHubSource()
  console.log(initialData)

  const { error, data } = useQuery(DOCKER_HUB_QUERY, {
    pollInterval: 10000,
    variables: { username: 'jessestuart' },
  })
  if (error) {
    log.error(error)
  }
  const { repos } = data

  const initialRepos: DockerHubRepo[] = parseRepos(initialData)
  const updatedRepos: DockerHubRepo[] = parseRepos(repos)

  return (
    <PureRepoList
      repos={_.isEmpty(updatedRepos) ? initialRepos : updatedRepos}
    />
  )
}

export default RepoList
