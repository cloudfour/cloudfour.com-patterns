/**
 * Toolkit JavaScript
 */

'use strict';

import Modernizr from 'modernizr';
import svgxuse from 'svgxuse';
import Bliss from 'bliss';
import {each} from './lib/dom/core';
import {FloatLabel} from './lib/component/float-label';
import {Sky} from './lib/component/sky';

(function() {

  var floatLabels = document.querySelectorAll('.js-FloatLabel');
  var skies = document.querySelectorAll('.Sky:not(.Sky--clouds)');

  each(floatLabels, element => {
    new FloatLabel(element, {
      eventName: Modernizr.oninput ? 'input' : 'keyup'
    });
  });

  each(skies, element => {
    new Sky({
      // TODO: this selector sucks
      root: element,
      menu: Bliss.$('#menu', element)[0],
      toggle: Bliss.$('a[href="#menu"]', element)[0],
    })
  });

}());
