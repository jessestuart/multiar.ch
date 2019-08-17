import gatsby from 'gatsby'
import _ from 'lodash'
import React from 'react'
import renderer from 'react-test-renderer'

import fixtures from '../../../test/fixtures/DockerHubReposFixture'

import RepoList from 'components/RepoList'
import PureRepoList from 'components/RepoList/PureRepoList'

jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  useStaticQuery: jest.fn(),
}))

describe('RepoList component', () => {
  test('Render PureRepoList component.', () => {
    const component = renderer.create(<PureRepoList repos={fixtures} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Render empty PureRepoList.', () => {
    const component = renderer.create(<PureRepoList repos={[]} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Render RepoList component.', () => {
    // @ts-ignore
    gatsby.useStaticQuery = jest.fn().mockImplementation(() => ({
      allDockerHubRepo: {
        edges: fixtures.map(fixture => ({
          node: fixture,
        })),
      },
    }))
    const component = renderer.create(<RepoList />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
