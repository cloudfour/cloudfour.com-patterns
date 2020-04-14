## Publishing to npm

1. `git checkout v-next`
2. `git pull`
3. Make sure you have a clean working tree (`git status` should show no changes)
4. `npm publish` - This will automatically install and compile everything, run linting, and publish

Note the branch is `v-next` for now. When we we merge this branch to master, these instructions should be updated.
