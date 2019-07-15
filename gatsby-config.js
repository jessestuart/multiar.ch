const _ = require('lodash')

const siteMetadata = {
  title: 'multiar.ch',
  siteUrl: 'https://multiar.ch',
  description: 'Collection of regularly-updated, multiarch Docker images.',
}

// If we detect if we're running in a CI environment, only a few sample
// photos will be downloaded from a test bucket, rather the the full
// high-resolution photos displayed in production. This is simply to
// save on AWS costs :)
const GatsbyEnv = {
  Development: 'Deveopment',
  Production: 'Production',
  Staging: 'Staging',
}

const GATSBY_ENV = GatsbyEnv[process.env.GATSBY_ENV]
const IS_LOCAL = GATSBY_ENV === GatsbyEnv.Development
// const AUTHOR_NAME = 'Jesse Stuart'
// const SITE_NAME = 'jesses.io'

const sourceFilesystem = {
  resolve: 'gatsby-source-filesystem',
  options: {
    path: `${__dirname}/src/pages`,
    name: 'pages',
  },
}

// const sourceFilesystemImages = {
//   resolve: 'gatsby-source-filesystem',
//   options: {
//     path: `${__dirname}/src/images`,
//     name: 'images',
//   },
// }

const typographyPlugin = {
  resolve: 'gatsby-plugin-typography',
  options: {
    pathToConfigModule: 'src/utils/typography',
  },
}

const dockerHubPlugin = {
  resolve: 'gatsby-source-docker-hub',
  options: {
    username: 'jessestuart',
  },
}

// const googleAnalyticsPlugin = {
//   resolve: 'gatsby-plugin-google-analytics',
//   options: {
//     trackingId: 'UA-113515971-1',
//   },
// }

// /* eslint-disable @typescript-eslint/camelcase */
// const manifestPlugin = {
//   resolve: 'gatsby-plugin-manifest',
//   options: {
//     name: 'Jesse Stuart',
//     short_name: 'jesses.io',
//     start_url: '/',
//     background_color: '#373b46',
//     theme_color: '#673ab7',
//     display: 'standalone',
//     icon: './src/components/Icons/logo_dark.svg',
//   },
// }
// /* eslint-enable @typescript-eslint/camelcase */

let plugins = _.compact([
  'gatsby-plugin-typescript',
  // ====================================
  // Gotta load those sweet, sweet files.
  // ====================================
  sourceFilesystem,
  // =======================================================================
  // Add in React Helmet and React 16 support until Gatsby v2 is released.
  // =======================================================================
  'gatsby-plugin-react-helmet',
  // ========================
  // Styling-related plugins.
  // ========================
  'gatsby-plugin-styled-components',
  typographyPlugin,
  // ==========================================
  // Transformers for Markdown and image files.
  // ==========================================
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  dockerHubPlugin,
  // ==========
  // Analytics.
  // ==========
  // googleAnalyticsPlugin,
  // ===========
  // Miscellany.
  // ===========
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-lodash',
])

if (!IS_LOCAL) {
  //=================================
  // Production/Staging-only plugins.
  //=================================
  plugins = _.concat(plugins, [
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cache',
    // 'gatsby-plugin-feed',
    // manifestPlugin,
    'gatsby-plugin-netlify',
  ])
}

module.exports = {
  siteMetadata,
  plugins,
}
