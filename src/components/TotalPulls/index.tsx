import { graphql, useStaticQuery } from 'gatsby'
import _ from 'lodash'
import fp from 'lodash/fp'
import React from 'react'
import { Box, Text } from 'rebass/styled-components'

import { colors } from 'styles/Theme'

const TotalPulls = () => {
  const query = useStaticQuery(graphql`
    {
      allDockerHubRepo {
        edges {
          node {
            pullCount
          }
        }
      }
    }
  `)
  const totalPulls: number = _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.sumBy('node.pullCount'),
  )(query)

  return (
    <Box className="flex justify-center items-center">
      Total pulls:
      <Text className="pl1 b" style={{ color: colors.text }}>
        {totalPulls}
      </Text>
    </Box>
  )
}

export default TotalPulls
