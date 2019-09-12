import { DockerHubRepo } from 'docker-hub-utils'
import _ from 'lodash'
import React from 'react'
import renderer from 'react-test-renderer'

import PureRepoList from 'components/RepoList/PureRepoList'
import { getReposToArchitecturesMap } from 'utils/repos'

import fixtures from '../../../test/fixtures/DockerHubReposFixture'

const reposFixtures = (fixtures as unknown) as DockerHubRepo[]

describe('PureRepoList component.', () => {
  beforeAll(() => {
    jest.mock('gatsby')
    jest.mock('../Apollo')
  })

  test('Render PureRepoList component.', () => {
    const component = renderer.create(
      <PureRepoList
        repos={reposFixtures}
        repoToArchitecturesMap={getReposToArchitecturesMap(reposFixtures)}
      />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Render empty PureRepoList.', () => {
    const component = renderer.create(
      <PureRepoList
        repos={[]}
        repoToArchitecturesMap={getReposToArchitecturesMap([])}
      />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
