import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import { colors } from 'styles/Theme'

const SubHeader = () => (
  <Flex className="pt5 pb4 bb bt b--black-10 flex justify-center pl4 pl0-ns">
    <Flex className="lh-title" flexDirection="column">
      <Text
        fontFamily="serif"
        className="i justify-center center pl3"
        style={{
          borderLeft: `2px ${colors.primary} solid`,
        }}
      >
        Cross-build so hard, muhfuckas wanna fine me;
        <br />
        (that manifest cray)
      </Text>
      <Flex className="justify-end">
        <Text fontFamily="serif">— Jay-Z, Probably</Text>
      </Flex>
    </Flex>
  </Flex>
)

export default SubHeader
