/**
 * Toolkit JavaScript
 */

'use strict';

import Modernizr from 'modernizr';
import svgxuse from 'svgxuse';
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
      root: element,
      menu: element.querySelector('.Sky-nav-menu'),
      toggle: element.querySelector('.Sky-nav-controls-skipToMenu')
    })
  });

}());
