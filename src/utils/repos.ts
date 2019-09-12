import { Architecture, DockerHubRepo } from 'docker-hub-utils'
import _ from 'lodash'
import fp from 'lodash/fp'

let reposToArchitectureMap: { [repoName: string]: Architecture[] }

export const getReposToArchitecturesMap = _.once((repos: DockerHubRepo[]) => {
  reposToArchitectureMap = _.reduce(
    repos,
    (acc, repo: DockerHubRepo) => ({
      ...acc,
      [repo.name]: _.flow(
        fp.get('manifestList.manifests'),
        fp.map('platform.architecture'),
      )(repo),
    }),
    {},
  )
  return reposToArchitectureMap
})

export const getArchitecturesForRepo = _.memoize(
  (repo: DockerHubRepo) => reposToArchitectureMap[repo.name],
)
