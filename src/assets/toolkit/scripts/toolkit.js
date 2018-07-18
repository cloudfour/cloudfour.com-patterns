/**
 * Toolkit JavaScript
 */

'use strict';

import {u} from 'umbrellajs';
import {FloatLabel} from './lib/component/float-label';
import {Sky} from './lib/component/sky';
import {ElasticTextarea} from './lib/component/elastic-textarea';
import {CommentReply} from './lib/component/comment-reply';
import {Slideshow} from './lib/component/slideshow';

/**
 * Syntax highlighting
 */
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';

// dependencies
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup-templating';

// these require dependencies
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-javascript';

const components = [];

u('.js-Slideshow').each(element => {
  components.push(new Slideshow(element));
});

u('.js-FloatLabel').each(element => {
  components.push(new FloatLabel(element));
});

/**
 * TODO: Make this smart enough to not just fail if `.Sky` has no nav.
 * Or better yet, hook it to a js-* class only when a nav is included.
 */
u('.Sky').each(element => {
  const menu = element.querySelector('.Sky-nav-menu');
  const toggle = element.querySelector('.Sky-nav-controls-skipToMenu');

  if (menu && toggle) {
    components.push(new Sky({
      root: element,
      menu,
      toggle
    }));
  }
});

u('.js-ElasticTextarea').each(element => {
  components.push(new ElasticTextarea(element));
});

let replyFormTemplate = document.getElementById('comment-replyForm-template');

if (replyFormTemplate) {
  replyFormTemplate = replyFormTemplate.innerHTML;
  u('.js-comment').each(element => {
    components.push(new CommentReply(element, {
      template: replyFormTemplate
    }));
  });
}
