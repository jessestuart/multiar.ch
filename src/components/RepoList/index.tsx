import { graphql, useStaticQuery } from 'gatsby'
import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'
import { Box, Text } from 'rebass'

import Theme from 'styles/Theme'

const RepoList = () => {
  const query = useStaticQuery(graphql`
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
          }
        }
      }
    }
  `)

  const repos: DockerHubRepo[] = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
    // fp.filter(repo => DateTime.fromISO(repo.lastUpdated).diffNow()),
  )(query)
  if (_.isEmpty(repos)) {
    return null
  }

  return (
    <Box className="justify-center center flex pt4 f4">
      <ol className="mw7-ns w-100">
        <li className="flex fw7 lh-copy">
          <Text className="flex-nowrap w-100" fontFamily="mono">
            Image
          </Text>
          <Text className="flex justify-end w-100" fontFamily="mono">
            Pulls
          </Text>
        </li>
        {repos.map((repo: DockerHubRepo, index: number) => {
          const lastUpdatedRelative = DateTime.fromISO(
            _.toString(repo.lastUpdated),
          ).toRelative()

          return (
            <li key={index} className="flex lh-copy pt2 pb3 bb b--near-white">
              <div className="w-100">
                <a
                  className="flex-nowrap primary lh-title"
                  style={{ color: Theme.colors.primary }}
                  href={`https://cloud.docker.com/u/jessestuart/repository/docker/jessestuart/${repo.name}`}
                >
                  <Text fontFamily="mono" color="primary" className="fw5">
                    {repo.name}
                  </Text>
                </a>
                <Text>{repo.description}</Text>
                <Text
                  className="flex justify-start no-underline flex-column f6"
                  fontFamily="sans-serif"
                  style={{ color: Theme.colors.textMuted }}
                >
                  Updated {lastUpdatedRelative}
                </Text>
              </div>
              <Text
                className="pl4"
                style={{ display: 'inline-block' }}
                fontFamily="mono"
              >
                {repo.pullCount.toLocaleString()}
              </Text>
            </li>
          )
        })}
      </ol>
    </Box>
  )
}

export default RepoList
