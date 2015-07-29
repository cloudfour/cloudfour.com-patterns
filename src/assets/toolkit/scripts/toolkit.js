/**
 * Toolkit JavaScript
 */

'use strict';

import Modernizr from 'modernizr';
import {each} from './lib/dom/core';
import {FloatLabel} from './lib/component/float-label';

(function() {

  var elements = document.querySelectorAll('.js-FloatLabel');

  each(elements, element => {
    new FloatLabel(element, {
      event: Modernizr.oninput ? 'input' : 'keyup'
    });
  });

}());
