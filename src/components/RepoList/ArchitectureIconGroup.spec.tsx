import { Architecture } from 'docker-hub-utils'
import React from 'react'
import renderer from 'react-test-renderer'

import { ArchitectureIconGroup } from 'components/RepoList/ArchitectureIcons'

describe('ArchitectureIconGroup', () => {
  test('render with default icons', () => {
    const component = renderer.create(
      <ArchitectureIconGroup
        architectures={[
          Architecture.arm,
          Architecture.arm64,
          Architecture.amd64,
        ]}
      />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('render with no icons', () => {
    const component = renderer.create(
      <ArchitectureIconGroup architectures={[]} />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
