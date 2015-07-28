'use strict';

import {extend} from '../util/object';
import * as classList from '../dom/classlist';

export class FloatLabel {

  constructor (element, options) {
    /** ES6 doesn't seem to have static class properties yet */
    const DEFAULTS = {
      input: 'input',
      className: 'is-empty',
      eventName: window.Modernizr.oninput ? 'input' : 'keyup'
    };

    this.element = element;
    this.options = extend({}, DEFAULTS, options);

    if (typeof this.options.input === 'string') {
      this.input = this.element.querySelector(this.options.input);
    } else {
      this.input = this.options.input;
    }

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
    if (this.isEmpty()) {
      classList.add(this.element, this.options.className);
    } else {
      classList.remove(this.element, this.options.className);
    }
  }
}
