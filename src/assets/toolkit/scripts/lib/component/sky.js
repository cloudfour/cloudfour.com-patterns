'use strict';

import {tweenNumber} from '../fx/tween';

const TRANS_DURATION = 500;
const EASING_CURVE = [0.455, 0.03, 0.515, 0.955];
const TEST_CLASS = 'u-testBlock';
const OPEN_CLASS = 'is-open';

function getHeight (element) {
  var height = element.offsetHeight;
  if (!height) {
    element.classList.add(TEST_CLASS);
    height = element.offsetHeight;
    element.classList.remove(TEST_CLASS);
  }
  return height;
}

function setTranslateStyle (element, val) {
  element.style.transform = `translateY(${val}px)`;
}

function translateY (element, endValue, duration = 0) {
  const transform = element.style.transform;
  const valuePattern = /^translateY\((-?\d+)(?:px)?\)/;
  const [,currentValue] = valuePattern.exec(transform) || [];
  const startValue = parseInt(currentValue || 0, 10);

  return new Promise(resolve => {
    const update = step => {
      setTranslateStyle(element, step);
      if (step === endValue) resolve(element);
    };

    tweenNumber(
      update,
      endValue,
      startValue,
      duration,
      EASING_CURVE
    );
  });
}

export class Sky {
  constructor ({ root, menu, toggle }) {
    Object.assign(this, {
      root,
      menu,
      toggle,
      container: root.parentElement,
      isOpen: false
    });

    // TODO: Seems like an okay thing to set via JS?
    this.container.style.willChange = 'transform';

    // This negates the `:target` styles
    this.menu.classList.add('is-active');

    this.toggle.addEventListener('click', event => {
      event.preventDefault();
      if (this.isOpen !== null) this.toggleMenu();
    });
  }

  toggleMenu () {
    const menuHeight = getHeight(this.menu);
    const slideContainer = (val) => {
      this.isOpen = null;
      return translateY(this.container, val, TRANS_DURATION);
    };

    if (this.isOpen) {
      slideContainer(menuHeight * -1)
        .then(() => {
          this.isOpen = false;
          this.menu.classList.remove(OPEN_CLASS);
          setTranslateStyle(this.container, 0);
        });
    } else {
      setTranslateStyle(this.container, menuHeight * -1);
      this.menu.classList.add(OPEN_CLASS);
      slideContainer(0).then(() => this.isOpen = true);
    }
  }
};
