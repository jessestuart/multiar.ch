import { graphql, useStaticQuery } from 'gatsby'
import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'
import { Box, Text } from 'rebass'
import styled from 'styled-components'

import Theme from 'styles/Theme'

const RepoListItem = styled.li``

const ArchitectureIcon = styled.span`
  background-color: #e5f4ee;
  border-radius: 10%;
  border: 1px solid #abb7b2;
  display: inline;
  font-family: 'Fira Mono';
  height: 100px;
  width: 100px;
  user-select: none !important;
`

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
    fp.filter(
      repo =>
        DateTime.fromISO(repo.lastUpdated).diffNow().milliseconds >
        -31540000000,
    ),
  )(query)
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
            const lastUpdatedRelative = DateTime.fromISO(
              _.toString(repo.lastUpdated),
            ).toRelative()
            const architectures: string[] = _.get(repo, 'architectures')

            return (
              <RepoListItem
                key={index}
                className={`flex lh-copy pt2 pb3 ${
                  index !== repos.length - 1 ? 'bb b--near-white' : ''
                }`}
              >
                <div style={{ flex: 1 }}>
                  <a
                    className="flex-nowrap primary lh-title dib mr2"
                    style={{ color: Theme.colors.primary }}
                    href={`https://cloud.docker.com/u/jessestuart/repository/docker/jessestuart/${repo.name}`}
                  >
                    <Text fontFamily="mono" color="primary" className="fw5">
                      {repo.name}
                    </Text>
                  </a>
                  {architectures &&
                    architectures
                      .sort()
                      .map((architecture: string, archIndex: number) => (
                        <ArchitectureIcon
                          key={archIndex}
                          className="f7 pa1 ma1"
                        >
                          {architecture}
                        </ArchitectureIcon>
                      ))}
                  <Text>{repo.description}</Text>
                  <Text
                    className="flex justify-start no-underline flex-column f6"
                    fontFamily="sans-serif"
                    style={{ color: Theme.colors.textMuted }}
                  >
                    Updated {lastUpdatedRelative}
                  </Text>
                </div>
                <Text className="pl4" fontFamily="mono">
                  {repo.pullCount.toLocaleString()}
                </Text>
              </RepoListItem>
            )
          })}
      </ol>
    </Box>
  )
}

export default RepoList
