import React from 'react'
import renderer from 'react-test-renderer'

import { Copyright, Footer, MadeWithLove } from 'components/Footer'

describe('Footer components.', () => {
  test('Copyright component.', () => {
    const component = renderer.create(<Copyright />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('MadeWithLove component.', () => {
    const component = renderer.create(<MadeWithLove />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Footer component.', () => {
    const component = renderer.create(<Footer />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
