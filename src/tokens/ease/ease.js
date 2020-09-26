/**
 * Transition Easing Functions
 */
module.exports = {
  ease: {
    /**
     * @see https://easings.net/en#easeInOutBack
     * @see https://cubic-bezier.com/#.56,-0.24,.51,1.29
     */
    ease_in_sine: { value: 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
    ease_out_sine: { value: 'cubic-bezier(0.39, 0.575, 0.565, 1)' },
    ease_in_out_sine: { value: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)' },
    ease_in_quad: { value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)' },
    ease_out_quad: { value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
    ease_in_out_quad: { value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' },
    ease_in_cubic: { value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' },
    ease_out_cubic: { value: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
    ease_in_out_cubic: { value: 'cubic-bezier(0.645, 0.045, 0.355, 1)' },
    ease_in_quart: { value: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)' },
    ease_out_quart: { value: 'cubic-bezier(0.165, 0.84, 0.44, 1)' },
    ease_in_out_quart: { value: 'cubic-bezier(0.77, 0, 0.175, 1)' },
    ease_in_quint: { value: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)' },
    ease_out_quint: { value: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    ease_in_out_quint: { value: 'cubic-bezier(0.86, 0, 0.07, 1)' },
    ease_in_expo: { value: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)' },
    ease_out_expo: { value: 'cubic-bezier(0.19, 1, 0.22, 1)' },
    ease_in_out_expo: { value: 'cubic-bezier(1, 0, 0, 1)' },
    ease_in_circ: { value: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)' },
    ease_out_circ: { value: 'cubic-bezier(0.075, 0.82, 0.165, 1)' },
    ease_in_out_circ: { value: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)' },
    ease_in_back: { value: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)' },
    ease_out_back: { value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
    ease_in_out_back: { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
    ease_in_out: { value: '{ease.ease_in_out_quad.value}' },
    ease_in: { value: '{ease.ease_in_quad.value}' },
    ease_out: { value: '{ease.ease_out_quad.value}' },
  },
};
