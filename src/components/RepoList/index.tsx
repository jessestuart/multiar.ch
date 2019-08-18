import { graphql, useStaticQuery } from 'gatsby'
import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'

import PureRepoList from 'components/RepoList/PureRepoList'

const RepoList = () => {
  const query = useStaticQuery(graphql`
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

  const initialRepos: DockerHubRepo[] = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
    fp.filter(repo => {
      const lastUpdated =
        typeof repo.lastUpdated === 'string'
          ? DateTime.fromISO(repo.lastUpdated).diffNow().milliseconds
          : DateTime.fromJSDate(repo.lastUpdated).diffNow().milliseconds
      const oneYearInMilliseconds = -31540000000
      // Only return repos that have been updated in the last year, and that
      // support more than one architecture.
      return (
        lastUpdated > oneYearInMilliseconds && _.size(repo.architectures) > 1
      )
    }),
  )(query)

  return <PureRepoList repos={initialRepos} />
}

export default RepoList
