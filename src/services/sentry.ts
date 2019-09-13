const Sentry = require('@sentry/browser')
const _ = require('lodash')

// Just use the package.json version number as the Sentry release param.
// Keep in mind this auto-incremented by semantic-release on deploys, so
// is a pretty good stand-in here.
const version = require('../../package.json').version

const SENTRY_DSN = 'https://724727a3650f47c1a0194515f319f59d@sentry.io/1519871'

export const initSentry = _.once(({ environment }) => {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment,
    release: version,
  })
})
