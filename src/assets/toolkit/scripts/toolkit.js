/**
 * Toolkit JavaScript
 */

'use strict';

import Modernizr from 'modernizr';
import * as elementList from './lib/dom/elementlist';
import {FloatLabel} from './lib/component/float-label';

(function() {

  var elements = document.querySelectorAll('.js-FloatLabel');

  elementList.forEach(elements, element => {
    new FloatLabel(element, {
      event: Modernizr.oninput ? 'input' : 'keyup'
    });
  });

}());
