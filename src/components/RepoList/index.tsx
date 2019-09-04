import { useQuery } from '@apollo/react-hooks'
import { DockerHubRepo } from 'docker-hub-utils'
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

const parseRepos: (repos: DockerHubRepo[]) => DockerHubRepo[] = _.flow(
  fp.filter((repo: DockerHubRepo) => {
    const lastUpdated =
      typeof repo.lastUpdated === 'string'
        ? DateTime.fromISO(repo.lastUpdated).diffNow().milliseconds
        : DateTime.fromJSDate(repo.lastUpdated).diffNow().milliseconds
    const oneYearInMilliseconds = -31540000000
    const numArchitectures = repo.manifestList
      ? _.flow(
          fp.get('manifestList.manifests'),
          fp.map('platform.architecture'),
          fp.size,
        )(repo)
      : null
    // Only return repos that have been updated in the last year, and that
    // support more than one architecture.
    return lastUpdated > oneYearInMilliseconds && numArchitectures > 1
  }),
  fp.compact,
)

const RepoList = ({ pollInterval }: { pollInterval?: number | undefined }) => {
  const initialData = useStaticQuery(GATSBY_SOURCE_GRAPHQL_QUERY)
  const initialRepos = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
    parseRepos,
  )(initialData)

  const { error, data } = useQuery(DOCKER_HUB_QUERY, { pollInterval })
  if (error) {
    log.error(error)
  }
  const updatedRepos: DockerHubRepo[] | undefined = _.get(data, 'repos')
  if (!updatedRepos || _.isEmpty(updatedRepos)) {
    return <PureRepoList repos={initialRepos} />
  }

  const mergedRepos = _.flow(
    fp.map((repo: DockerHubRepo) => {
      const manifestList = _.flow(
        fp.filter({ name: repo.name }),
        fp.first,
        fp.get('manifestList'),
      )(initialRepos)
      return {
        ...repo,
        manifestList,
      }
    }),
    parseRepos,
  )(updatedRepos)

  return <PureRepoList repos={mergedRepos} />
}

export default RepoList
