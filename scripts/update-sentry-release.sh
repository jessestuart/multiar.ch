#!/bin/bash

set -eu

export SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
export SENTRY_ORG=jesses

function create_release() {
  version=$1
  # Create a release.
  sentry-cli releases new -p jesses-io "$version"
  # Associate commits with the release.
  sentry-cli releases set-commits --auto "$version"
}

GIT_HASH="multiar.ch@$(sentry-cli releases propose-version)"
GIT_TAG="multiar.ch@$(git tags --list | tail -n1)"

create_release "$GIT_HASH"
create_release "$GIT_TAG"

sentry-cli releases deploys "$GIT_TAG" new -e Production
