import { DockerHubRepo } from 'docker-hub-utils'
import { Architecture } from 'docker-hub-utils'
import _ from 'lodash'
import React from 'react'
import { Flex, Text } from 'rebass/styled-components'

import { PullCountMap } from 'components/RepoList'
import RepoListRow from 'components/RepoList/RepoListRow'
import { colors } from 'styles/Theme'

interface Props {
  initialRepoPullCount?: PullCountMap
  repos: DockerHubRepo[] | undefined
  repoToArchitecturesMap: { [repoName: string]: Architecture[] }
}

const PureRepoList = ({
  initialRepoPullCount,
  repos,
  repoToArchitecturesMap,
}: Props) => {
  if (!repos || _.isEmpty(repos)) {
    return null
  }

  return (
    <Flex className="center f4 justify-center pt4">
      <ol className="mw7-ns">
        <li className="flex fw7 lh-copy">
          <Text className="flex-nowrap flex-auto" fontFamily="mono">
            Image
          </Text>
          <Text className="flex justify-end" fontFamily="mono">
            Pulls
          </Text>
        </li>
        {_.sortBy(repos, 'pullCount')
          .reverse()
          .map((repo: DockerHubRepo, index: number) => {
            return (
              <RepoListRow
                key={repo.name}
                initialRepoPullCount={initialRepoPullCount}
                repo={repo}
                architectures={repoToArchitecturesMap[repo.name]}
                style={
                  index === repos.length - 1
                    ? null
                    : { borderBottom: `1px ${colors.neutral} solid` }
                }
              />
            )
          })}
      </ol>
    </Flex>
  )
}

export default PureRepoList
