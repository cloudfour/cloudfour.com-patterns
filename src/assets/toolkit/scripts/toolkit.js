/**
 * Toolkit JavaScript
 */

'use strict';

import Modernizr from 'modernizr';
import svgxuse from 'svgxuse';
import {each} from './lib/dom/core';
import {FloatLabel} from './lib/component/float-label';

(function() {

  var elements = document.querySelectorAll('.js-FloatLabel');

  each(elements, element => {
    new FloatLabel(element, {
      eventName: Modernizr.oninput ? 'input' : 'keyup'
    });
  });

}());
