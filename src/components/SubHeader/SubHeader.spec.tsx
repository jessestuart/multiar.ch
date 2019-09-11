import React from 'react'
import renderer from 'react-test-renderer'

import SubHeader from 'components/SubHeader'

test('SubHeader component.', () => {
  const component = renderer.create(<SubHeader />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
