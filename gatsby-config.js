const _ = require('lodash')

const siteMetadata = {
  title: 'multiar.ch',
  siteUrl: 'https://multiar.ch',
  description: 'Collection of regularly-updated, multiarch Docker images.',
}

const GatsbyEnv = {
  Development: 'Development',
  Production: 'Production',
  Staging: 'Staging',
}

const GATSBY_ENV = GatsbyEnv[process.env.GATSBY_ENV] || GatsbyEnv.Development
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

const googleAnalyticsPlugin = {
  resolve: 'gatsby-plugin-google-analytics',
  options: {
    trackingId: 'UA-147094030-1',
  },
}

const manifestPlugin = {
  resolve: 'gatsby-plugin-manifest',
  options: {
    name: 'multiar.ch',
    short_name: 'multiar.ch',
    start_url: '/',
    background_color: 'white',
    theme_color: '#e5f4ee',
    display: 'standalone',
  },
}

let plugins = _.compact([
  'gatsby-plugin-typescript',
  // ====================================
  // Gotta load those sweet, sweet files.
  // ====================================
  sourceFilesystem,
  'gatsby-plugin-react-helmet',
  // ========================
  // Styling-related plugins.
  // ========================
  'gatsby-plugin-styled-components',
  typographyPlugin,
  // ==========================================
  // Transformers for Markdown and image files.
  // ==========================================
  dockerHubPlugin,
  // ==========
  // Analytics.
  // ==========
  googleAnalyticsPlugin,
  // ===========
  // Miscellany.
  // ===========
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-lodash',
  'gatsby-plugin-preload-fonts',
])

if (!IS_LOCAL) {
  //=================================
  // Production/Staging-only plugins.
  //=================================
  plugins = _.concat(plugins, [
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cache',
    manifestPlugin,
    'gatsby-plugin-netlify',
  ])
}

module.exports = {
  siteMetadata,
  plugins,
}
