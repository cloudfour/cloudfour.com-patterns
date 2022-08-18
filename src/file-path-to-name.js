// Converts e.g. /asdf/1234/some-name.js to some-name
export const filePathToName = (filePath) =>
  /([^/.]*)\.?[^/]*$/.exec(filePath)?.[1] || filePath;
