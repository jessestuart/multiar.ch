import React from 'react'
import renderer from 'react-test-renderer'

import { ArchitectureIconGroup } from 'components/RepoList/RepoListRow'

describe('ArchitectureIconGroup', () => {
  test('render with default icons', () => {
    const component = renderer.create(
      <ArchitectureIconGroup architectures={['amd64', 'arm64', 'arm']} />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
