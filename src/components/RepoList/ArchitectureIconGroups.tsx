import { Architecture } from 'docker-hub-utils'
import React from 'react'
import styled from 'styled-components'

import { colors, fonts } from '../../styles/Theme'

export const ArchitectureIcon = styled.span`
  background-color: ${colors.secondary};
  border-radius: 10%;
  border: 1px solid #abb7b2;
  display: inline;
  font-family: ${fonts.mono};
  user-select: none !important;
`

// eslint-disable-next-line
export const ArchitectureIconGroup = ({ architectures }) => (
  <>
    {[...architectures].sort().map((architecture: Architecture) => (
      <ArchitectureIcon key={architecture} className="f7 pa1 ma1">
        {architecture}
      </ArchitectureIcon>
    ))}
  </>
)
