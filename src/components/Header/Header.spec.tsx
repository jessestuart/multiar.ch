import React from 'react'
import renderer from 'react-test-renderer'

import Header from '.'

test('Render Header component.', () => {
  const component = renderer.create(<Header>multiar.ch</Header>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
