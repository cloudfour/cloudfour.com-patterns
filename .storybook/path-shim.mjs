export const extname = (p) => /\.[^.]*$/.exec(p)?.[0] || '';

export const basename = (p, ext = '') => {
  let result = /\/([^/]*)$/.exec(p)?.[1];
  if (!result) return '';
  if (ext && result.endsWith(ext))
    return result.slice(0, result.length - ext.length);
  return result;
};

export const dirname = (p) => /(^.*)\/[^/]*$/.exec(p)?.[1] || p;

export default { extname, dirname, basename };
