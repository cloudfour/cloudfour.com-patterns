#!/usr/bin/env bash

# Exit if anything fails
set -e

# Update package.json with new version, combine all the changesets files into the changelog
./node_modules/.bin/changeset version

NEW_VERSION=$(cat package.json | jq -r ".version")

# changesets version does not update package-lock.json or create a commit, or create a tag. npm version does all of those
# npm version requires clean working tree, so changes are stashed
git stash
npm version "${NEW_VERSION}"
git stash pop

