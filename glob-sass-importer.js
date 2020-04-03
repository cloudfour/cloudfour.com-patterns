const glob = require('tiny-glob');
const path = require('path');

/** @typedef {{file: string} | {contents: string} | null } ResolveResult */

/**
 * Custom glob importer
 * Needed to implement this because none of the sass glob importers on npm output @use
 * @param {string} url Raw path in source code
 * @param {string} currentPath Path to the current file
 * @param {(result: ResolveResult) => void} done Callback function for async resolvers
 * @returns {ResolveResult | void}
 */
const globImporter = (url, currentPath, done) => {
  // This is a really lazy check but it is easy and good enough
  const isGlob = url.includes('*');
  if (!isGlob) return null;
  glob(url, { cwd: path.dirname(currentPath) }).then((matchingPaths) => {
    // Generates a fake file that has the expanded @forward statements
    const contents = matchingPaths
      .map((filePath) => `@forward "${filePath}";`)
      .join('\n');
    done({ contents });
  });
};

module.exports = globImporter;
