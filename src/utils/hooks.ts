import { graphql, useStaticQuery } from 'gatsby'
import _ from 'lodash'
import fp from 'lodash/fp'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  )
  return site.siteMetadata
}

export const useDockerHubSource = () => {
  const dockerHubRepos = useStaticQuery(graphql`
    {
      allDockerHubRepo {
        edges {
          node {
            description
            id
            lastUpdated
            name
            pullCount
            starCount
            manifestList {
              manifests {
                platform {
                  architecture
                }
              }
            }
          }
        }
      }
    }
  `)
  return _.flow(
    fp.get('allDockerHubRepo.edges'),
    fp.map('node'),
  )(dockerHubRepos)
}
