import { useStaticQuery } from 'gatsby'
import _ from 'lodash'
import React from 'react'
import renderer from 'react-test-renderer'

import fixtures from '../../../test/fixtures/DockerHubReposFixture'

import RepoList, { PureRepoList } from '.'

jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  useStaticQuery: jest.fn(),
}))

describe('RepoList component', () => {
  beforeAll(() => {
    // @ts-ignore
    useStaticQuery.mockImplementation(() => ({
      allDockerHubRepo: {
        edges: fixtures.map(fixture => ({
          node: fixture,
        })),
      },
    }))
  })

  test('Render PureRepoList component.', () => {
    const component = renderer.create(<PureRepoList repos={fixtures} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Render RepoList component.', () => {
    const component = renderer.create(<RepoList />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Render empty RepoList.', () => {
    const component = renderer.create(<PureRepoList repos={[]} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
