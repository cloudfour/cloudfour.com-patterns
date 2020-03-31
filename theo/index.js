const theo = require('theo');
const mdxStoriesFormat = require('./formats/stories.mdx');
const msTransforms = require('./transforms/modular-scale');
const msTransformKeys = Object.keys(msTransforms);

// Register formats
theo.registerFormat('stories.mdx', mdxStoriesFormat);

// Register multiple modular scale transforms
msTransformKeys.forEach(key => {
  const def = msTransforms[key];
  theo.registerValueTransform(key, def.predicate, def.transform);
});

// Override the default "web" transform
theo.registerTransform('web', ['color/rgb', ...msTransformKeys]);

// Export this Theo to be consumed by other build tools
module.exports = theo;
