import classNames from 'classnames'
import { Architecture, DockerHubRepo } from 'docker-hub-utils'
import _ from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import { Link, Text } from 'rebass/styled-components'
import { Box } from 'reflexbox'

import { ArchitectureIconGroup } from 'components/RepoList/ArchitectureIconGroups'

const getDockerHubURL = (repo: DockerHubRepo): string =>
  `https://hub.docker.com/r/${repo.user}/${repo.name}`

interface Props {
  className?: string
  repo: DockerHubRepo
  architectures: Architecture[]
  style?: any
}

const RepoListRow = (props: Props) => {
  const { architectures = [], className, repo } = props
  const lastUpdatedRelative: string | null = DateTime.fromISO(
    repo.lastUpdated,
  ).toRelative()
  const repoUrl = getDockerHubURL(repo)

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
        {lastUpdatedRelative ? (
          <Text
            className="flex flex-column f6 justify-start no-underline"
            fontFamily="sans"
            color="textMuted"
          >
            Updated {lastUpdatedRelative}
          </Text>
        ) : null}
      </Box>
      <Text className="flex flex-auto justify-end pl4" fontFamily="mono">
        {repo.pullCount.toLocaleString()}
      </Text>
    </li>
  )
}

export default RepoListRow
