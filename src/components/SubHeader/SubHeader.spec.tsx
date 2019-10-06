import React from 'react'
import renderer from 'react-test-renderer'
import theme from '../../styles/Theme'
import { ThemeProvider } from 'styled-components'

import SubHeader from 'components/SubHeader'

test('SubHeader component.', () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <SubHeader />
    </ThemeProvider>,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
