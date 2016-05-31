'use strict';

export class FloatLabel {
  /**
   * @param {DOM} element
   * @param {Object} options
   * @param {String} options.inputElement - Reference to input within element.
   * @param {String} options.eventName - Event that will trigger updates.
   * @param {String} options.className - Class applied to `element` when `inputElement` is empty.
   */
  constructor(element, {
    inputElement = element.querySelector('input, textarea'),
    eventName = 'input',
    className = 'is-empty'
  } = {}) {
    // Assign properties
    Object.assign(this, {
      element,
      inputElement,
      eventName,
      className
    });
    // Listen for event and update
    this.element.addEventListener(this.eventName, this.update.bind(this));
    // Run first update now
    this.update();
  }

  update () {
    if (this.isEmpty) {
      this.element.classList.add(this.className);
    } else {
      this.element.classList.remove(this.className);
    }
  }

  get isEmpty () {
    return !this.inputElement.value.trim().length;
  }
}
