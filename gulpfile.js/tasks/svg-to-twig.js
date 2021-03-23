const { src, dest } = require('gulp');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const { obj } = require('through2');
const ltx = require('ltx');
const yaml = require('js-yaml');
const path = require('path');
const { readFileSync } = require('fs');

// Load SVGO preferences from config file to keep things DRY
const svgoPath = path.join(__dirname, '../../.svgo.yml');
const svgoConfig = yaml.load(readFileSync(svgoPath, 'utf8'));

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
  const svg = ltx.parse(src);

  // Create blocks for SVG content, before and after
  const prepend = ltx.parse(
    '<root>{% block before %}{% endblock %}{% block content %}</root>'
  );
  const append = ltx.parse(
    '<root>{% endblock %}{% block after %}{% endblock %}</root>'
  );
  svg.children = [...prepend.children, ...svg.children, ...append.children];

  // Identify props already in use in the SVG versus those yet to be used
  const usedProps = dynamicSvgProps.filter((prop) => Boolean(svg.attrs[prop]));
  const unusedProps = dynamicSvgProps.filter((prop) => !svg.attrs[prop]);

  // Properties already in use should have their value set to a conditional.
  // The `default` filter would be less code, but things get tricky when it
  // comes to managing quotation marks in XML.
  for (const prop of usedProps) {
    const current = svg.attrs[prop];
    // Dashes have meaning in Twig expressions, so we replace them with
    // underscores in property names.
    const twigProp = prop.replace(/-/g, '_');
    svg.attrs[
      prop
    ] = `{% if ${twigProp} %}{{${twigProp}}}{% else %}${current}{% endif %}`;
  }

  // Grab the SVG source to this point
  let result = svg.root().toString();

  if (unusedProps.length > 0) {
    // We build a big string of attribute name/value pairs for any properties
    // yet to be used for this asset.
    const unusedPropHtml = unusedProps
      .map((prop) => {
        const twigProp = prop.replace(/-/g, '_');
        return `{% if ${twigProp} %} ${prop}="{{${twigProp}}}"{% endif %}`;
      })
      .join('');

    // We tack this string onto the root SVG element, which we assume ends with
    // the first occurrence of `>`.
    result = result.replace('>', `${unusedPropHtml}>`);
  }

  return result;
}

/**
 * Gulp task for converting SVG files to Twig templates.
 */
function svgToTwig() {
  return (
    src('src/assets/**/*.svg')
      // Optimize assets with SVGO
      .pipe(svgmin(svgoConfig))
      // Pipe file contents through templatize function
      .pipe(
        obj((file, _, cb) => {
          if (file.isBuffer()) {
            const template = templatizeSvgString(file.contents.toString());
            file.contents = Buffer.from(template);
          }

          cb(null, file);
        })
      )
      // Append `.twig` to filenames
      .pipe(rename({ extname: '.svg.twig' }))
      // Output to same directory to expose to Storybook
      .pipe(dest('src/assets'))
  );
}

// Expose to Gulp
module.exports = svgToTwig;
