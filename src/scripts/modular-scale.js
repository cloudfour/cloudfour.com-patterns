// Get modular scale ratio from design token.
const tokens = require('../tokens/number/scale-modular');

// Convert the string to a number
const ratio = Number(tokens.number.scale.modular.ratio.value);

/**
 * Modular Scale
 * Simple function for calculating ratio steps
 * @param {string} step
 */
const modularScale = (step) => {
  return ratio ** Number(step);
};
exports.modularScale = modularScale;

/**
 * Modular Scale in Ems
 * @param {string} step
 */
exports.modularEm = (step) => {
  return `${modularScale(step)}em`;
};

/**
 * Modular Scale in Rems
 * @param {string} step
 */
exports.modularRem = (step) => {
  return `${modularScale(step)}rem`;
};

/**
 * Modular Scale in Pixels
 * @param {string} step
 */
exports.modularPx = (step) => {
  return `${modularScale(step) * 16}px`;
};
