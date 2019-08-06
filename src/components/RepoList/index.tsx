import { graphql, useStaticQuery } from 'gatsby'
import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'
import { Box, Text } from 'rebass'

import RepoListRow from 'components/RepoList/RepoListRow'

export const PureRepoList = ({ repos }: { repos: DockerHubRepo[] }) => {
  return (
    <Box className="justify-center center flex pt4 f4">
      <ol className="mw7-ns">
        <li className="flex fw7 lh-copy">
          <Text className="flex-nowrap w-100" fontFamily="mono">
            Image
          </Text>
          <Text className="flex justify-end w-100" fontFamily="mono">
            Pulls
          </Text>
        </li>
        {_.sortBy(repos, 'pullCount')
          .reverse()
          .map((repo: DockerHubRepo, index: number) => {
            return (
              <RepoListRow
                className={index !== repos.length - 1 ? 'bb b--near-white' : ''}
                key={index}
                repo={repo}
              />
            )
          })}
      </ol>
    </Box>
  )
}

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

  const repos: DockerHubRepo[] = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
    fp.filter(repo => {
      const lastUpdated =
        typeof repo.lastUpdated === 'string'
          ? DateTime.fromISO(repo.lastUpdated).diffNow().milliseconds
          : DateTime.fromJSDate(repo.lastUpdated).diffNow().milliseconds
      return lastUpdated > -31540000000
    }),
  )(query)
  if (_.isEmpty(repos)) {
    return null
  }

  return <PureRepoList repos={repos} />
}

export default RepoList
