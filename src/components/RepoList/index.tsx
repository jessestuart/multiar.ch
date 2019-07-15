import { graphql, useStaticQuery } from 'gatsby'
import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import fp from 'lodash/fp'
import { DateTime } from 'luxon'
import React from 'react'
import { Box, Text } from 'rebass'

const RepoList = () => {
  const query = useStaticQuery(graphql`
    {
      allDockerHubRepo {
        edges {
          node {
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
      <ol className="mw8-ns w-100">
        <li className="flex fw7 lh-copy">
          <Text className="flex-nowrap w-100" fontFamily="mono">
            Image
          </Text>
          <Text className="flex justify-end w-100" fontFamily="mono">
            Last Updated
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
            <li key={index} className="flex lh-copy">
              <Text className="flex-nowrap w-100" fontFamily="mono">
                <a
                  className="flex-nowrap"
                  href={`https://cloud.docker.com/u/jessestuart/repository/docker/jessestuart/${repo.name}`}
                >
                  {repo.name}
                </a>
              </Text>
              <Text className="flex justify-end w-100" fontFamily="mono">
                {lastUpdatedRelative}
              </Text>
              <Text className="flex justify-end w-100" fontFamily="mono">
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
