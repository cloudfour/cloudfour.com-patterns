const groupBy = require('lodash/groupBy');
const camelCase = require('lodash/camelCase');
const kebabCase = require('lodash/kebabCase');
const startCase = require('lodash/startCase');
const { basename, extname } = require('path');

/**
 * Return a string containing Storybook Docs MDX markup for a color.
 *
 * @param {Object} prop - Theo property
 * @returns {String}
 */
function mdxColor(prop) {
  return `
<ColorItem
  title={'$${kebabCase(prop.name)}'}
  subtitle={${prop.comment ? `'${prop.comment}'` : null}}
  colors={['${prop.value}']}/>`.trim();
}

/**
 * Return a string containing Storybook Docs MDX markup for multiple colors.
 *
 * @param {Array} props - Theo properties
 * @returns {String}
 */
function mdxColors(props) {
  const colors = props.map(mdxColor);
  return `
<ColorPalette>
  ${colors.join('\n')}
</ColorPalette>`.trim();
}

/**
 * Return a string containing Storybook Docs MDX markup for a single row of a
 * property table.
 *
 * @param {Object} prop - Theo property
 * @param {Boolean} includeComment - If `true`, include a comment cell.
 * @returns {String}
 */
function mdxProp(prop, includeComment) {
  // First cell has small percentage to give values and comments more room.
  let content = `<td style={{width:'10%'}}><code>$${kebabCase(
    prop.name
  )}</code></td>`;

  if (prop.category === 'font-family') {
    // Create an array for each of the fonts in the family string
    let fonts = prop.value.split(',');
    // Start a new array to hold the preview elements we're about to create
    const fontStrings = [];
    // For each font string we create, we are going to remove the first font
    // element using `shift`. This allows each segment to be previewed along
    // with its remaining fallbacks.
    while (fonts.length) {
      fontStrings.push(
        `<span style={{ fontFamily: \`${fonts.join(
          ','
        )}\`}}>${fonts.shift().trim()}</span>`
      );
    }
    content += `<td>${fontStrings.join(', ')}</td>`;
  } else {
    content += `<td><code>${prop.value}</code></td>`;
  }

  if (includeComment) {
    content += `<td>${prop.comment || '&nbsp;'}</td>`;
  }

  return `<tr>${content.trim()}</tr>`;
}

/**
 * Return a string containing Storybook Docs MDX markup for a property table.
 *
 * @param {Array} props - Theo properties
 * @returns {String}
 */
function mdxProps(props) {
  const commentedProps = props.filter((prop) => !!prop.comment);
  const includeComments = commentedProps.length > 0;
  const rows = props.map((prop) => mdxProp(prop, includeComments));
  return `
<table>
  <thead>
    <th>Name</th>
    <th>Value</th>
    ${includeComments ? `<th>Comment</th>` : ''}
  </thead>
  <tbody>${rows.join('\n')}</tbody>
</table>`.trim();
}

/**
 * Return a string containing Storybook Docs MDX markup for a single category
 * of Theo properties.
 *
 * @param {String} category - Category of Theo properties
 * @param {Array} props - Theo properties
 * @returns {String}
 */
function categoryToMdx(category, props) {
  const categoryTitle = startCase(category);
  let categoryBody;
  if (category.includes('color')) {
    categoryBody = mdxColors(props);
  } else {
    categoryBody = mdxProps(props);
  }

  return `
## ${categoryTitle}

${categoryBody}
`.trim();
}

/**
 * Theo format for Storybook Docs (`.stories.mdx`).
 *
 * @param {ImmutableMap} result - Map of Theo properties and meta.
 * @returns {String}
 */
function mdxStoriesFormat(result) {
  const file = result.getIn(['meta', 'file']);
  const filename = basename(file);
  const slug = basename(filename, extname(filename));
  const title = startCase(slug);
  const props = result.get('props').toJS();
  const firstProp = props[0];
  firstProp.sassName = `$${kebabCase(firstProp.name)}`;
  firstProp.jsName = camelCase(firstProp.name);
  firstProp.jsonValue = JSON.stringify(firstProp.value);
  const categories = groupBy(props, 'category');
  const mdxCategories = Object.keys(categories).map((category) =>
    categoryToMdx(category, categories[category])
  );
  return `
import { Meta, ColorPalette, ColorItem } from '@storybook/addon-docs/blocks';

<Meta title="Design Tokens/${title}"/>

# ${title}

\`\`\`scss
@use 'path/to/design-tokens/${filename}';
$example: ${slug}.${firstProp.sassName}; // => ${firstProp.value}
\`\`\`
\`\`\`javascript
import { ${
    firstProp.jsName
  } } from 'path/to/design-tokens/generated/${slug}.js';
console.log(${firstProp.jsName}); // => ${firstProp.jsonValue}
\`\`\`

${mdxCategories.join('\n\n')}`.trim();
}

module.exports = mdxStoriesFormat;
