'use strict';

import {tweenNumber} from '../fx/tween';

const TRANS_DURATION = 500;
const EASING_CURVE = [0.455, 0.03, 0.515, 0.955];
const TEST_CLASS = 'u-testBlock';
const OPEN_CLASS = 'is-open';
const TRANSLATE_VALUE_PATTERN = /^translateY\((-?\d+)(?:px)?\)/;

/**
 * Shortcut for getting the height of an element.
 *
 * TODO: This seems kind of hacky, esp w/ the test class. Move?
 *
 * @param {Element} element - The element to get the height of.
 * @returns {Number} The height of `element`.
 */
function getHeight (element) {
  var height = element.offsetHeight;
  if (!height) {
    element.classList.add(TEST_CLASS);
    height = element.offsetHeight;
    element.classList.remove(TEST_CLASS);
  }
  return height;
}

/**
 * Shortcut for setting `element.style.transform = translateY()`.
 *
 * @param {Element} element - The element to mutate styles on.
 * @param {Number} translateY - The desired value (in px) of `translateY`.
 */
function setTranslateStyle (element, translateY) {
  element.style.transform = `translateY(${translateY}px)`;
}

/**
 * Tween the `style.transform` property of `element`.
 *
 * @param {Element} element - The element to translate.
 * @param {Number} endValue - The desired end value of `translateY`.
 * @param {Number} duration - The duration of the tween.
 * @returns {Promise} A promise resolving with `element` when the tween is done.
 */
function translateY (element, endValue, duration = 0) {
  // Dig the current transform/translate value out of `element.style`
  const transform = element.style.transform;
  const [,currentValue] = TRANSLATE_VALUE_PATTERN.exec(transform) || [];

  // Use the existing translate value, or default to 0
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

/**
 * Class representing the "Sky" navigation CSS component.
 */
export class Sky {
  /**
   * Assign members; set initial CSS; attach event handlers.
   *
   * @param {Object} options - The options object defining each inner-element.
   * @param {Element} options.root - The root component element.
   * @param {Element} options.menu - The menu element (within `root`).
   * @param {Element} options.toggle - The menu toggle element (within `root`).
   */
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

  /**
   * Slide the menu in and out of view.
   */
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
