'use strict';

export class FloatLabel {
  /**
   * @see https://mathiasbynens.be/notes/oninput
   * @param {DOM} element
   * @param {Object} options
   * @param {String} options.inputElement - Reference to input within element.
   * @param {String} options.className - Class applied to `element` when `inputElement` is empty.
   */
  constructor(element, {
    inputElement = element.querySelector('input, textarea'),
    className = 'is-empty'
  } = {}) {
    // Assign properties
    Object.assign(this, {
      element,
      inputElement,
      className
    });
    // Fallback event handler
    var keyUpHandler = () => this.update();
    // Ideal event handler, will remove the other one if supported
    var inputHandler = () => {
      this.element.removeEventListener('keyup', keyUpHandler);
      this.update();
    };
    // Attach events
    this.element.addEventListener('input', inputHandler);
    this.element.addEventListener('keyup', keyUpHandler);
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
