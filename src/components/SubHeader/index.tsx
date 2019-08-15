import React from 'react'
import { Text } from 'rebass/styled-components'
import { colors } from 'styles/Theme'

const SubHeader = () => (
  <div className="pt5 pb4 bb bt b--black-10 flex justify-center">
    <Text className="flex flex-column lh-title mw7">
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
      <div className="flex justify-end">
        <Text fontFamily="serif" pl={2}>
          — Jay-Z, Probably
        </Text>
      </div>
    </Text>
  </div>
)

export default SubHeader
