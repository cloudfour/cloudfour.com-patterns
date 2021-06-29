/**
 * Generate a twig source string of an include with args, i.e.
 * {% include '@cloudfour/components/button.twig' with { "type": "disabled" } only %}
 * @param {string} path
 * @param {any} args
 */
export const makeTwigInclude = (path, args = {}) => {
  const argsString =
    Object.keys(args).length > 0
      ? ` with ${JSON.stringify(args, null, 2)}`
      : '';
  return `{% include '${path}'${argsString} only %}`;
};
