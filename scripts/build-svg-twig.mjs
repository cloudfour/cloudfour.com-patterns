import fs from 'node:fs/promises';
import path from 'node:path';

import { load as parseYaml } from 'js-yaml';
import { parse as parseXml } from 'ltx';
import { optimize } from 'svgo';

const srcDir = 'src/assets';

// Load SVGO preferences from config file to keep things DRY
const svgoConfig = parseYaml(
  await fs.readFile(path.join(import.meta.dirname, '../.svgo.yml'), 'utf8'),
);

// Properties to make configurable via Twig templates
const dynamicSvgProps = [
  'aria-hidden',
  'aria-labelledby',
  'class',
  'focusable',
  'height',
  'id',
  'preserveAspectRatio',
  'role',
  'style',
  'viewBox',
  'width',
];

/**
 * Accepts SVG source markup and templatizes root attributes while also adding
 * layout blocks (`before`, `content` and `after`) to its contents.
 *
 * @param {string} src - The source SVG markup.
 * @returns {string}
 */
function templatizeSvgString(src) {
  const svg = parseXml(src);

  // Create blocks for SVG content, before and after
  const prepend = parseXml(
    '<root>{% block before %}{% endblock %}{% block content %}</root>',
  );
  const append = parseXml(
    '<root>{% endblock %}{% block after %}{% endblock %}</root>',
  );
  svg.children = [...prepend.children, ...svg.children, ...append.children];

  // Identify props already in use in the SVG versus those yet to be used
  const usedProps = dynamicSvgProps.filter((prop) => svg.attrs[prop]);
  // eslint-disable-next-line unicorn/no-computed-property-existence-check -- Complements the line above: both test for a truthy value, not for the property existing.
  const unusedProps = dynamicSvgProps.filter((prop) => !svg.attrs[prop]);

  // Properties already in use should have their value set to a conditional.
  // The `default` filter would be less code, but things get tricky when it
  // comes to managing quotation marks in XML.
  for (const prop of usedProps) {
    const current = svg.attrs[prop];
    // Dashes have meaning in Twig expressions, so we replace them with
    // underscores in property names.
    const twigProp = prop.replaceAll('-', '_');
    svg.attrs[prop] =
      `{% if ${twigProp} %}{{${twigProp}}}{% else %}${current}{% endif %}`;
  }

  // Grab the SVG source to this point
  let result = svg.root().toString();

  if (unusedProps.length > 0) {
    // We build a big string of attribute name/value pairs for any properties
    // yet to be used for this asset.
    const unusedPropHtml = unusedProps
      .map((prop) => {
        const twigProp = prop.replaceAll('-', '_');
        return `{% if ${twigProp} %} ${prop}="{{${twigProp}}}"{% endif %}`;
      })
      .join('');

    // We tack this string onto the root SVG element, which we assume ends with
    // the first occurrence of `>`.
    result = result.replace('>', () => `${unusedPropHtml}>`);
  }

  return result;
}

const files = await Array.fromAsync(fs.glob(`${srcDir}/**/*.svg`));

await Promise.all(
  files.toSorted().map(async (file) => {
    const source = await fs.readFile(file, 'utf8');
    const { data } = optimize(source, { ...svgoConfig, path: file });
    // Output to the same directory to expose to Storybook
    const destination = file.replace(/\.svg$/v, '.svg.twig');
    await fs.writeFile(destination, templatizeSvgString(data));
  }),
);

console.log(`Templatized ${files.length} SVG files`);
