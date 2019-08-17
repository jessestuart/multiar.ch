import { DockerHubRepo } from 'gatsby-source-docker-hub'
import _ from 'lodash'
import React from 'react'
import { Box, Text } from 'rebass/styled-components'

import RepoListRow from 'components/RepoList/RepoListRow'
import { colors } from 'styles/Theme'

interface Props {
  repos: DockerHubRepo[] | undefined
}

const PureRepoList = ({ repos = [] }: Props) => {
  if (_.isEmpty(repos)) {
    return null
  }
  return (
    <Box className="justify-center center flex pt4 f4">
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

export default PureRepoList
