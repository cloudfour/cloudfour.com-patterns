'use strict';

import BezierEasing from 'bezier-easing';

export function setTween (stepFn, duration = 0) {
  const enqueue = window.requestAnimationFrame;
  var start;
  var elapsed;
  var progress;

  function iterate (time) {
    elapsed = Math.floor(time - start);
    progress = elapsed / Math.max(elapsed, duration);
    stepFn(progress);
    if (progress < 1) {
      enqueue(iterate);
    }
  }

  return enqueue(time => {
    start = time;
    enqueue(iterate);
  });
};
