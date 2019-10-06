import React from 'react'
import renderer from 'react-test-renderer'
import theme from '../../styles/Theme'
import { ThemeProvider } from 'styled-components'

import Header from '.'

test('Render Header component.', () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Header>multiar.ch</Header>
    </ThemeProvider>,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
