import { graphql, useStaticQuery } from 'gatsby'
import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'
import { Box, Text } from 'rebass/styled-components'

import RepoListRow from 'components/RepoList/RepoListRow'
import { colors } from 'styles/Theme'

interface Props {
  repos: DockerHubRepo[] | undefined
}

export const PureRepoList = ({ repos = [] }: Props) => {
  if (_.isEmpty(repos)) {
    return null
  }
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
                key={index}
                repo={repo}
                style={
                  index !== repos.length - 1
                    ? { borderBottom: `1px ${colors.neutral} solid` }
                    : null
                }
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

  const initialRepos: DockerHubRepo[] = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
    fp.filter(repo => {
      const lastUpdated =
        typeof repo.lastUpdated === 'string'
          ? DateTime.fromISO(repo.lastUpdated).diffNow().milliseconds
          : DateTime.fromJSDate(repo.lastUpdated).diffNow().milliseconds
      const oneYearInMilliseconds = -31540000000
      return lastUpdated > oneYearInMilliseconds
    }),
  )(query)

  return <PureRepoList repos={initialRepos} />
}

export default RepoList
