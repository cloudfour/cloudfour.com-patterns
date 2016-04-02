'use strict';

import Bliss from 'bliss';
import {tweenNumber} from '../fx/tween';

const TRANS_DURATION = 500;
const EASING_CURVE = [0.455, 0.03, 0.515, 0.955];
const TEST_CLASS = 'u-testBlock';
const OPEN_CLASS = 'is-open';

/**
 * TODO: Move this?
 */
function getHeight (element) {
  let height = element.offsetHeight;

  if (!height) {
    element.classList.add(TEST_CLASS);
    height = element.offsetHeight;
    element.classList.remove(TEST_CLASS);
  }
  return height;
}

/**
 * Transform the container translation over time.
 */
function translateY (element, endValue, duration = 0) {
  const transform = element.style.transform;
  const valuePattern = /^translateY\((-?\d+)(?:px)?\)/;
  const [,currentValue] = valuePattern.exec(transform) || [];
  const startValue = parseInt(currentValue || 0, 10);

  return new Promise(function (resolve) {
    const tweenOptions = {
      stepFn: update,
      curve: EASING_CURVE,
      duration
    }
    function update (step) {
      step = Math.trunc(step);
      element.style.transform = `translateY(${step}px)`;
      if (step === endValue) resolve(element);
    }
    tweenNumber(startValue, endValue, tweenOptions);
  });
}

export class Sky {
  constructor ({ root, menu, toggle }) {
    Object.assign(this, {
      root,
      menu,
      toggle,
      container: root.parentElement
    });

    function onToggleClick (event) {
      event.preventDefault();
      this.toggleMenu();
    }

    Bliss.events(this.toggle, {
      click: onToggleClick.bind(this)
    });
  }

  toggleMenu () {
    // TODO: Not crazy about relying on classList.contains
    const isOpen = this.menu.classList.contains(OPEN_CLASS);
    const menuHeight = getHeight(this.menu);

    translateY(this.container, menuHeight * -1, isOpen ? TRANS_DURATION : 0)
      .then(() => {
        this.menu.classList.toggle(OPEN_CLASS, !isOpen);
        translateY(this.container, 0, isOpen ? 0 : TRANS_DURATION);
      });
  }
};
