import _ from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import { Heart } from 'react-feather'
import { Box, Flex } from 'reflexbox'
import { colors, space } from 'styles/Theme'

export const Copyright = () => (
  <Flex className="justify-center items-center">
    © 2018–{DateTime.local().year}{' '}
    <a
      href="https://jesses.io/"
      className="pl1 b"
      style={{ color: colors.text }}
    >
      Jesse Stuart
    </a>
  </Flex>
)

export const MadeWithLove = () => (
  <Box className="dib center tc flex-ns justify-center items-center">
    Pixels, bits and bytes hand-crafted with
    <Heart
      className="hot-pink mh1"
      fill={colors.hotPink}
      height={space[3]}
      width={space[3]}
    />
    in NYC.
  </Box>
)

export const Footer = () => {
  return (
    <footer
      className="b-primary bb bottom-0 bw2 f5-ns f6 flex flex-column fw4 pa4 w-100"
      style={{
        borderTop: `1px ${colors.neutral} solid`,
      }}
    >
      <Copyright />
      <MadeWithLove />
    </footer>
  )
}

export default Footer
