/**
 * Convert an object of story arguments into a Twig `with` string for use in
 * template source strings.
 * @param {any} args
 */
export const makeArgsString = (args = {}) => {
  if (Object.keys(args).length > 0) {
    return ` with ${JSON.stringify(args, null, 2)}`;
  }

  return '';
};

/**
 * Generate a twig source string of an include with args, i.e.
 * {% include '@cloudfour/components/button.twig' with { "type": "disabled" } only %}
 * @param {string} path
 * @param {any} args
 */
export const makeTwigInclude = (path, args = {}) => {
  const argsString = makeArgsString(args);
  return `{% include '${path}'${argsString} only %}`;
};

/**
 * Generate a twig source string of an embed with args and blocks. If block
 * names are included in args, their content will be included as a block within
 * the embed. If no blocks are found, an include string will be returned
 * instead.
 * @param {string} path
 * @param {any} args
 * @param {string[]} blockNames
 */
export const makeTwigEmbed = (path, args = {}, blockNames = []) => {
  const blocks = [];
  /** @type {Record<string, any>} */
  const filteredArgs = {};

  for (const [key, value] of Object.entries(args)) {
    if (blockNames.includes(key)) {
      blocks.push(`
  {% block ${key} %}
    ${value}
  {% endblock %}`);
    } else {
      filteredArgs[key] = value;
    }
  }

  // If no blocks are found, return an include string since an embed is not
  // necessary.
  if (blocks.length === 0) {
    return makeTwigInclude(path, args);
  }

  const argsString = makeArgsString(filteredArgs);
  return `{% embed '${path}'${argsString} only %}${blocks.join('\n')}
{% endembed %}`;
};

/**
 * @param {string} path
 * @param {any} args
 * @param {string[]} blockNames
 */
export const makeTwigEmbedIfHtml = (path, args = {}, blockNames = []) => {
  const filteredBlockNames = [];

  for (const blockName of blockNames) {
    const blockValue = args[blockName];
    if (
      typeof blockValue === 'string' &&
      /<\/?[a-z][\S\s]*>/i.test(blockValue)
    ) {
      filteredBlockNames.push(blockName);
    }
  }

  return makeTwigEmbed(path, args, filteredBlockNames);
};
