import gatsby from 'gatsby'
import _ from 'lodash'
import React from 'react'
import renderer from 'react-test-renderer'

import TotalPulls from '.'
import fixtures from '../../../test/fixtures/DockerHubReposFixture'

jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  useStaticQuery: jest.fn(),
}))

describe('TotalPulls component.', () => {
  beforeEach(() => {
    // @ts-ignore
    gatsby.useStaticQuery = jest.fn().mockImplementation(() => ({
      allDockerHubRepo: {
        edges: fixtures.map(fixture => ({
          node: fixture,
        })),
      },
    }))
  })

  test('Render TotalPulls component.', () => {
    const component = renderer.create(<TotalPulls />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
