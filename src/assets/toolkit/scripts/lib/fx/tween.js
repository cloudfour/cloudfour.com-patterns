'use strict';

import BezierEasing from 'bezier-easing';

/**
 * Tweens a number from `startValue` to `endValue` over the `duration` time period,
 * calling `onAnimationFrame` on each animation frame.
 */
export function tweenNumber (
  onPaint,
  endValue,
  startValue = 0,
  duration = 500,
  bezier = [0, 0, 1, 1]
) {
  const easing = BezierEasing(...bezier);
  var start;
  var elapsed;
  var progress;
  var stepValue;

  function iterate (timestamp) {
    start = start || timestamp;
    elapsed = Math.ceil(timestamp - start);
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
  window.requestAnimationFrame(iterate);
};
