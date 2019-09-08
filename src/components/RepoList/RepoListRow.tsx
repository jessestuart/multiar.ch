import classNames from 'classnames'
import { DockerHubRepo } from 'docker-hub-utils'
import { Architecture } from 'docker-hub-utils'
import _ from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import { Link, Text } from 'rebass/styled-components'
import { Box } from 'reflexbox'
import styled from 'styled-components'

import { colors } from 'styles/Theme'

const DOCKER_HUB_URL = 'https://hub.docker.com/r/jessestuart/'

export const ArchitectureIcon = styled.span`
  background-color: ${colors.secondary};
  border-radius: 10%;
  border: 1px solid #abb7b2;
  display: inline;
  font-family: 'Fira Mono';
  user-select: none !important;
`

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
  architectures: Architecture[]
  style?: any
}

const RepoListRow = (props: Props) => {
  const { architectures, className, repo } = props
  const lastUpdatedRelative = DateTime.fromISO(
    _.toString(repo.lastUpdated),
  ).toRelative()

  const repoUrl = `${DOCKER_HUB_URL}${repo.name}`

  return (
    <li
      key={repo.name}
      className={classNames('flex lh-copy pt2 pb3', className)}
      style={props.style}
    >
      <Box>
        <Link
          className="flex-nowrap inline-flex primary"
          color="primary"
          href={repoUrl}
        >
          <Text fontFamily="mono" className="fw5 pr2">
            {repo.name}
          </Text>
        </Link>
        <ArchitectureIconGroup architectures={architectures} />
        <Text className="lh-title pv2">{repo.description}</Text>
        <Text
          className="flex flex-column f6 justify-start no-underline"
          fontFamily="sans"
          color="textMuted"
        >
          Updated {lastUpdatedRelative}
        </Text>
      </Box>
      <Text className="flex flex-auto justify-end pl4 " fontFamily="mono">
        {repo.pullCount.toLocaleString()}
      </Text>
    </li>
  )
}

export default RepoListRow
