/**
 * Toolkit JavaScript
 */

'use strict';

import {u} from 'umbrellajs';
import {FloatLabel} from './lib/component/float-label';
import {Sky} from './lib/component/sky';
import {ElasticTextarea} from './lib/component/elastic-textarea';
import {CommentReply} from './lib/component/comment-reply';

/**
 * Syntax highlighting
 */
import 'prismjs';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss';

(function() {

  u('.js-FloatLabel').map(element => {
    new FloatLabel(element);
  });

  /**
   * TODO: Make this smart enough to not just fail if `.Sky` has no nav.
   * Or better yet, hook it to a js-* class only when a nav is included.
   */
  u('.Sky').map(element => {
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

  u('.js-ElasticTextarea').map(element => {
    new ElasticTextarea(element, {
      eventName: 'keyup'
    });
  });

  var replyFormTemplate = document.getElementById('comment-replyForm-template');

  if (replyFormTemplate) {
    replyFormTemplate = replyFormTemplate.innerHTML;
    u('.js-comment').map(element => {
      new CommentReply(element, {
        template: replyFormTemplate
      });
    });
  }

}());
