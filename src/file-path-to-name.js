/**
 * Converts e.g. /asdf/1234/some-name.js to some-name
 * @param {string} filePath
 */
export const filePathToName = (filePath) =>
  /([^./]*)\.?[^/]*$/.exec(filePath)?.[1] || filePath;
