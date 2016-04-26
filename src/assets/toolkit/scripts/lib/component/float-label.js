'use strict';

import {toggleClass} from '../dom/attributes';

export class FloatLabel {
  constructor(element, {
    // Reference to input within element
    inputElement = element.querySelector('input, textarea'),
    // Event that will trigger updates
    eventName = 'input',
    // Class applied to `element` when `inputElement` is empty
    className = 'is-empty'
  } = {}) {
    // Assign properties
    this.element = element;
    this.inputElement = inputElement;
    this.eventName = eventName;
    this.className = className;
    // Listen for event and update
    this.element.addEventListener(this.eventName, this.update.bind(this));
    // Run first update now
    this.update();
  }

  update () {
    toggleClass(this.element, this.className, this.isEmpty);
  }

  get isEmpty () {
    return !this.inputElement.value.trim().length;
  }
}
