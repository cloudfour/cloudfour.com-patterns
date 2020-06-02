#!/usr/bin/env bash

# Exit if anything fails
set -e

# Update package.json with new version, combine all the changesets files into the changelog
./node_modules/.bin/changeset version

NEW_VERSION=$(cat package.json | jq -r ".version")

# changesets version does not update package-lock.json. npm version does.
# npm version requires clean working tree,
# so changes to changelog + changesets are stashed and then reapplied

# Undo changes to package.json before stashing. They will be re-done by npm version
git checkout -- package.json
git stash
npm version "${NEW_VERSION}" --git-tag-version=false
git stash pop

# Now all of the changes are ready to be committed:
# [package.json, package-lock.json, CHANGELOG.md, .changeset/**]

git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"

git add -A
git commit -m "Release ${NEW_VERSION}"
git tag "v${NEW_VERSION}"
