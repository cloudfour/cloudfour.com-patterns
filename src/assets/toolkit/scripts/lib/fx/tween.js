'use strict';

import BezierEasing from 'bezier-easing';
import {noop} from '../util/function';

export function tweenNumber (
  startValue,
  endValue,
  {
    duration = 300,
    stepFn = noop,
    curve = [0, 0, 1, 1]
  } = {}
) {
  const easing = BezierEasing(...curve);
  const diff = (a, b, x) => a + (b - a) * x;
  let start = null;

  function iterate (timestamp) {
    let elapsed;
    let progress;
    let stepValue;

    start = start || timestamp;
    elapsed = timestamp - start;
    duration = Math.max(0, duration);
    progress = (elapsed / (duration - elapsed));
    stepValue = diff(startValue, endValue, easing(progress));
    stepFn(stepValue);

    if (progress < 1) {
      window.requestAnimationFrame(iterate);
    } else {
      start = null;
      return;
    }
  }

  if (!duration) {
    stepFn(endValue);
    return;
  }
  window.requestAnimationFrame(iterate);
};
