'use strict';

import BezierEasing from 'bezier-easing';

/**
 * Transitions a number from one value to another over a period of time.
 *
 * @example
 *
 *   tweenNumber(
 *     (value, progress) => element.style.width = `${value}px`
 *     100,                 // element will be 100px wide
 *     element.style.width, // counting up from element's current width
 *     2000,                // taking a total of 2 seconds to complete
 *     [0.4, 0.2, 0.5, 0.9] // following an easing curve along the way
 *   );
 *
 * @callback onPaint - The function that is called on each frame repaint.
 * @param {Number} The current value between `startValue` and `endValue`.
 * @param {Number} The current progress of the transition (a float between 0 and 1).
 *
 * @param {Number} endValue - The value to end with.
 * @param {Number} [startValue=0] - The value to start with.
 * @param {Number} [duration=500] - The transition duration in milliseconds.
 * @param {Array} [bezier=[0, 0, 1, 1]] - The curve control points for easing.
 */
export function tweenNumber (
  onPaint,
  endValue,
  startValue = 0,
  duration = 500,
  bezier = [0, 0, 1, 1]
) {
  // The easing function to transform the step progress on each frame.
  const easing = BezierEasing(...bezier);

  // The transition start time.
  var start;

  // The time elapsed (in ms) from `start`.
  var elapsed;

  // The progress of the transition (as a decimal between 0 and 1).
  var progress;

  // The current value between `startValue` and `endValue` on each frame.
  var stepValue;

  /**
   * Calculate everything and call `onPaint` with the current values.
   *
   * 1. Math.ceil is used to eliminate microsecond rounding from `progress`.
   */
  function iterate (timestamp) {
    start = start || timestamp;
    elapsed = Math.ceil(timestamp - start); // 1
    progress = elapsed / Math.max(elapsed, duration);
    stepValue = startValue + (endValue - startValue) * easing(progress);

    onPaint(stepValue, progress);

    if (progress < 1) {
      window.requestAnimationFrame(iterate);
    }
  }

  // Force positive duration of at least 1ms
  duration = Math.max(duration, 0);

  // Skip animation if there's no duration
  if (!duration) {
    onPaint(endValue, 1);
    return;
  }

  // Start the transition
  window.requestAnimationFrame(iterate);
};
