/**
 * Toolkit JavaScript
 */

'use strict';

import Modernizr from 'modernizr';
import svgxuse from 'svgxuse';
import {each} from './lib/dom/core';
import {FloatLabel} from './lib/component/float-label';
import {Sky} from './lib/component/sky';
import {ElasticTextarea} from './lib/component/elastic-textarea';

(function() {

  var floatLabels = document.querySelectorAll('.js-FloatLabel');
  var skies = document.querySelectorAll('.Sky');
  var textareas = document.querySelectorAll('.js-ElasticTextarea');

  each(floatLabels, element => {
    new FloatLabel(element, {
      eventName: Modernizr.oninput ? 'input' : 'keyup'
    });
  });

  /**
   * TODO: Make this smart enough to not just fail if `.Sky` has no nav.
   * Or better yet, hook it to a js-* class only when a nav is included.
   */
  each(skies, element => {
    var menu = element.querySelector('.Sky-nav-menu');
    var toggle = element.querySelector('.Sky-nav-controls-skipToMenu');

    if (menu && toggle) {
      new Sky({
        root: element,
        menu: menu,
        toggle: toggle
      })
    }
  });

  each(textareas, element => {
    new ElasticTextarea(element, {
      eventName: Modernizr.oninput ? 'input' : 'keyup'
    });
  });

}());
