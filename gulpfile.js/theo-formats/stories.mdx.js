const groupBy = require('lodash/groupBy');
const kebabCase = require('lodash/kebabCase');
const startCase = require('lodash/startCase');
const { basename, extname } = require('path');

function mdxColor(prop) {
  return `
<ColorItem
  title={'$${kebabCase(prop.name)}'}
  subtitle={${prop.comment ? `'${prop.comment}'` : null}}
  colors={['${prop.value}']}/>`.trim();
}

function mdxColors(props) {
  const colors = props.map(mdxColor);
  return `
<ColorPalette>
  ${colors.join('\n')}
</ColorPalette>`.trim();
}

function mdxProp(prop) {
  return `
<tr>
  <th scope="row">$${kebabCase(prop.name)}</th>
  <td>${prop.value}</td>
</tr>
  `.trim();
}

function mdxProps(props) {
  const rows = props.map(mdxProp);
  return `
<table>
  <thead>
    <th>Name</th>
    <th>Value</th>
  </thead>
  <tbody>${rows.join('\n')}</tbody>
</table>`.trim();
}

function categoryToMdx(category, props) {
  const categoryTitle = startCase(category);
  let categoryBody;
  if (category.includes('color')) {
    categoryBody = mdxColors(props);
  } else {
    categoryBody = mdxProps(props);
  }

  return `
# ${categoryTitle}

${categoryBody}
`.trim();
}

function mdxStoriesFormat(result) {
  const file = result.getIn(['meta', 'file']);
  const title = startCase(basename(file, extname(file)));
  const props = result.get('props').toJS();
  const categories = groupBy(props, 'category');
  const mdxCategories = Object.keys(categories).map(category =>
    categoryToMdx(category, categories[category])
  );
  return `
import { Meta, ColorPalette, ColorItem } from '@storybook/addon-docs/blocks';

<Meta title="Tokens/${title}"/>

${mdxCategories.join('\n\n')}`.trim();
}

module.exports = mdxStoriesFormat;
