'use strict';

import BezierEasing from 'bezier-easing';

// https://www.npmjs.com/package/eases
import eases from 'eases';

/**
 * Associates easing function sources w/ types
 */
const sourcesByType = [
  // Array of points? Use BezierEasing to calculate.
  [Array, points => BezierEasing(...points)],

  // String alias? Use predefined ease calculations.
  [String, alias => eases[alias]]
];

class EaseFunction {
  /**
   * Creates an easing function based on the supplied equation or point values.
   *
   * @param {String|Array} input - An array of points or a string alias.
   * @returns {Function} A function to transform a float between 0 and 1.
   */
  static create (input) {
    const type = input.constructor;
    const easerSource = sourcesByType.find(el => el[0] === type);
    const easerFn = easerSource ? easerSource[1] : null;
    if (easerFn) {
      return easerFn(input);
    } else {
      throw `An easing function could not be created from ${input}.`;
    }
  }
}

export class Easer {
  /**
   * Constructs a function that will calculate a float value between two number
   * boundaries. The calculated value will be translated based on an easing
   * equation.
   *
   * @param {String|Array} easing - The basis for the easing equation.
   * @returns {Function} The resulting function. TODO: document this better.
   * @example
   *
   *   const easer = new Easer('quadInOut');
   *   easer(0, 100, 0.25); // 12.5
   *   easer(0, 100, 0.5);  // 50
   *   easer(0, 100, 0.75); // 87.5
   *   easer(0, 100, 1);    // 100
   */
  constructor (easing = 'linear') {
    const easeFn = EaseFunction.create(easing);
    return (start, end, progress) =>
      start + (end - start) * easeFn(progress);
  }
}
