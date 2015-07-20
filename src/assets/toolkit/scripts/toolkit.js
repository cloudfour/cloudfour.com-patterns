/**
 * Toolkit JavaScript
 */

'use strict';

/**
 * TODO: Define and implement module structure for project.
 */

/**
 * FloatLabel
 */
(function() {

  /**
   * Utilities
   *
   * http://youmightnotneedjquery.com/
   */

  var addClass = function(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };

  var removeClass = function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  var extend = function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }

    return out;
  };

  /**
   * Module
   */

  var FloatLabel = function(element, options) {
    this.element = element;
    this.options = extend({}, FloatLabel.DEFAULTS, options);
    if (typeof this.options.input === 'string') {
      this.input = this.element.querySelector(this.options.input);
    } else {
      this.input = this.options.input;
    }
    this.init();
  };

  FloatLabel.DEFAULTS = {
    input: 'input',
    className: 'is-empty',
    eventName: 'keyup'
  };

  FloatLabel.prototype.init = function() {
    this.element.addEventListener(this.options.eventName, this.run.bind(this));
    this.run();
  };

  FloatLabel.prototype.isEmpty = function() {
    return !this.input.value.trim().length;
  };

  FloatLabel.prototype.run = function() {
    if (this.isEmpty()) {
      addClass(this.element, this.options.className);
    } else {
      removeClass(this.element, this.options.className);
    }
  };

  /**
   * Use module
   */

  var elements = document.querySelectorAll('.js-FloatLabel');
  Array.prototype.forEach.call(elements, function (element) {
    new FloatLabel(element);
  });

}());
