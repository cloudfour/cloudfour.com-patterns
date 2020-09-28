// Get modular scale ratio from design token.
const tokens = require('../tokens/number/scale-modular');

// Convert the string to a number
const ratio = Number(tokens.number.scale.modular.ratio.value);

// Simple function for calculating ratio steps
const modularScale = (step) => {
  return ratio ** Number(step);
};

// Export functions for various unit types
exports.modularScale = modularScale;

exports.modularEm = (step) => {
  return `${modularScale(step)}em`;
};

exports.modularRem = (step) => {
  return `${modularScale(step)}rem`;
};

exports.modularPx = (step) => {
  return `${modularScale(step) * 16}px`;
};
