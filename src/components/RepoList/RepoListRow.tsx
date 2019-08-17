import classNames from 'classnames'
import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import { Text } from 'rebass/styled-components'
import { Box } from 'reflexbox'
import styled from 'styled-components'

import Theme from 'styles/Theme'

const DOCKER_HUB_URL =
  'https://cloud.docker.com/u/jessestuart/repository/docker/jessestuart/'

export const ArchitectureIcon = styled.span`
  background-color: #e5f4ee;
  border-radius: 10%;
  border: 1px solid #abb7b2;
  display: inline;
  font-family: 'Fira Mono';
  user-select: none !important;
`

export type Architecture = 'amd64' | 'arm64' | 'arm'

interface IconGroupProps {
  architectures: Architecture[] | undefined
}

export const ArchitectureIconGroup = ({ architectures }: IconGroupProps) => (
  <>
    {architectures &&
      architectures.sort().map((architecture: string) => (
        <ArchitectureIcon key={architecture} className="f7 pa1 ma1">
          {architecture}
        </ArchitectureIcon>
      ))}
  </>
)

interface Props {
  className?: string
  repo: DockerHubRepo
  style?: any
}

const RepoListRow = (props: Props) => {
  const { className, repo } = props
  const lastUpdatedRelative = DateTime.fromISO(
    _.toString(repo.lastUpdated),
  ).toRelative()
  const architectures: Architecture[] | undefined = _.get(repo, 'architectures')
  const repoUrl = `${DOCKER_HUB_URL}${repo.name}`

  return (
    <li
      key={repo.name}
      className={classNames('flex lh-copy pt2 pb3', className)}
      style={props.style}
    >
      <Box>
        <a
          className="dib flex-nowrap lh-title mr2 primary"
          style={{ color: Theme.colors.primary }}
          href={repoUrl}
        >
          <Text fontFamily="mono" color="primary" className="fw5">
            {repo.name}
          </Text>
        </a>
        <ArchitectureIconGroup architectures={architectures} />
        <Text>{repo.description}</Text>
        <Text
          className="flex justify-start no-underline flex-column f6"
          fontFamily="sans-serif"
          color="textMuted"
        >
          Updated {lastUpdatedRelative}
        </Text>
      </Box>
      <Text className="pl4 flex justify-end" fontFamily="mono">
        {repo.pullCount.toLocaleString()}
      </Text>
    </li>
  )
}

export default RepoListRow
