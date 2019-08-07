import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import { Text } from 'rebass/styled-components'
import styled from 'styled-components'

import Theme from 'styles/Theme'

export const ArchitectureIcon = styled.span`
  background-color: #e5f4ee;
  border-radius: 10%;
  border: 1px solid #abb7b2;
  display: inline;
  font-family: 'Fira Mono';
  user-select: none !important;
`

export type Architecture = 'amd64' | 'arm64' | 'arm'

export const ArchitectureIconGroup = ({
  architectures,
}: {
  architectures: Architecture[] | undefined
}) => (
  <>
    {architectures &&
      architectures.sort().map((architecture: string, archIndex: number) => (
        <ArchitectureIcon key={archIndex} className="f7 pa1 ma1">
          {architecture}
        </ArchitectureIcon>
      ))}
  </>
)

interface Props {
  className?: string
  repo: DockerHubRepo
}

const RepoListRow = (props: Props) => {
  const { className, repo } = props
  const lastUpdatedRelative = DateTime.fromISO(
    _.toString(repo.lastUpdated),
  ).toRelative()
  const architectures: Architecture[] | undefined = _.get(repo, 'architectures')
  const repoUrl = `https://cloud.docker.com/u/jessestuart/repository/docker/jessestuart/${repo.name}`

  return (
    <li key={repo.name} className={`flex lh-copy pt2 pb3 ${className}`}>
      <div className="flex-auto">
        <a
          className="flex-nowrap primary lh-title dib mr2"
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
      </div>
      <Text className="pl4" fontFamily="mono">
        {repo.pullCount.toLocaleString()}
      </Text>
    </li>
  )
}

export default RepoListRow
