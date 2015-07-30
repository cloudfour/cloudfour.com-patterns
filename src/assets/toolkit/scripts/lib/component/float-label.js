'use strict';

import {extend} from '../util/object';
import {toggleClass} from '../dom/attributes';

export class FloatLabel {

  constructor (element, options) {
    // ES6 doesn't seem to have static class properties yet
    const DEFAULTS = {
      // A descendant selector for, or reference to the <input> within
      input: 'input',
      // The state class that is added/removed
      className: 'is-empty',
      // The keyboard event that triggers the logic to apply `className`
      eventName: 'input'
    };

    this.element = element;
    this.options = extend({}, DEFAULTS, options);
    this.input = typeof this.options.input === 'string' ?
      this.element.querySelector(this.options.input) : this.options.input;

    this.init();
  }

  init () {
    this.element.addEventListener(
      this.options.eventName,
      this.run.bind(this)
    );
    this.run();
  }

  isEmpty () {
    return !this.input.value.trim().length;
  }

  run () {
    toggleClass(this.element, this.options.className, this.isEmpty());
  }
}
