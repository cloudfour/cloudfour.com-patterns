const { src, dest } = require('gulp');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const { obj } = require('through2');
const ltx = require('ltx');

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
  'width'
];

function templatizeSvgString(src) {
  const svg = ltx.parse(src);

  // Create blocks for SVG content, before and after
  const prepend = ltx.parse('<root>{% block before %}{% endblock %}{% block content %}</root>');
  const append = ltx.parse('<root>{% endblock %}{% block after %}{% endblock %}</root>');
  svg.children = [...prepend.children, ...svg.children, ...append.children];

  const usedProps = dynamicSvgProps.filter(prop => Boolean(svg.attrs[prop]));
  const unusedProps = dynamicSvgProps.filter(prop => !svg.attrs[prop]);

  usedProps.forEach(prop => {
    const current = svg.attrs[prop];
    const twigProp = prop.replace(/-/g, '_');
    svg.attrs[prop] = `{% if ${twigProp} %}{{${twigProp}}}{% else %}${current}{% endif %}`;
  });

  let result = svg.root().toString();

  if (unusedProps.length > 0) {
    const unusedPropHtml = unusedProps.map(prop => {
      const twigProp = prop.replace(/-/g, '_');
      return `{% if ${twigProp} %} ${prop}="{{${twigProp}}}"{% endif %}`;
    }).join('');

    result = result.replace('>', `${unusedPropHtml}>`);
  }

  return result;
}

function svgToTwig() {
  return src('src/assets/**/*.svg')
    .pipe(svgmin({
      plugins: [
        { removeXMLNS: true },
        { removeViewBox: false }
      ]
    }))
    .pipe(obj((file, _, cb) => {
      if (file.isBuffer()) {
        const template = templatizeSvgString(file.contents.toString());
        file.contents = Buffer.from(template);
      }

      cb(null, file);
    }))
    .pipe(rename({ extname: '.svg.twig' }))
    .pipe(dest('src/assets'));
}

exports.svgToTwig = svgToTwig;
