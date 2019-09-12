import { MockedProvider } from '@apollo/react-testing'
import * as Gatsby from 'gatsby'
import _ from 'lodash'
import React from 'react'
import renderer, { act } from 'react-test-renderer'
import wait from 'waait'

import fixtures from '../../../test/fixtures/DockerHubReposFixture'

import RepoList, { DOCKER_HUB_QUERY } from 'components/RepoList'

jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  useStaticQuery: jest.fn(),
}))

const mocks = [
  {
    request: {
      query: DOCKER_HUB_QUERY,
    },
    result: {
      data: {
        repos: fixtures,
      },
    },
  },
]

const MockedRepoList = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <RepoList />
  </MockedProvider>
)

describe('RepoList component', () => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
  beforeAll(() => {
    useStaticQuery.mockImplementation(() => ({
      allDockerHubRepo: {
        edges: fixtures.map(repo => ({
          node: repo,
        })),
      },
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Render RepoList component with initial data.', () => {
    const component = renderer.create(<MockedRepoList />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Render RepoList component using data from apollo-client.', async () => {
    await act(async () => {
      await wait(0)
      const component = renderer.create(<MockedRepoList />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
