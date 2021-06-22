const { modularEm } = require('../../scripts/modular-scale');

// Minimum heading level to output tokens for (`-2` means three above `h1`)
const minLevel = -2;
// Maximum heading level to output tokens for (`3` means `h3`)
const maxLevel = 3;
// Modular scale steps to increase from minimum to maximum values
const fluidSteps = 1;

// Store heading token groups here
const headingTokens = {};

// Generate heading tokens
for (let level = minLevel; level <= maxLevel; level++) {
  // Replace `-` with `n` in token names to avoid awkward case across languages
  const levelSuffix = `${level}`.replace('-', 'n');
  // Determine minimum size based on current level
  const minStep = level * -1 + maxLevel;
  // Determine maximum size based on minimum size
  const maxStep = minStep + fluidSteps;
  // Store `max` and `min` tokens
  headingTokens[`heading_${levelSuffix}`] = {
    max: {
      value: modularEm(maxStep),
      comment: `Maximum fluid size for heading level ${level}.`,
    },
    min: {
      value: modularEm(minStep),
      comment: `Minimum fluid size for heading level ${level}.`,
    },
  };
}

module.exports = {
  size: {
    font: headingTokens,
  },
};
