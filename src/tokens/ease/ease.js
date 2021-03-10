/**
 * Transition Easing Functions
 *
 * @see https://easings.net/
 */
module.exports = {
  ease: {
    in_out: {
      value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      comment: 'https://easings.net/en#easeInOutQuad',
    },
    in: {
      value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
      comment: 'https://easings.net/en#easeInQuad',
    },
    out: {
      value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      comment: 'https://easings.net/en#easeOutQuad',
    },
  },
};
