import { expect, test } from 'vitest';

import template from './demo/basic.twig';
import divTemplate from './demo/div.twig';

/**
 * These assert the element the template chose for its header, which is what
 * `overview.twig` documents: a `header` inside a `div` would announce a page-level
 * banner landmark, so the template downgrades it to a `div` unless the overview is
 * a sectioning element.
 *
 * See the note in `card.test.ts` for why this is a markup assertion rather than the
 * accessibility tree snapshot it used to be. It applies doubly here: an unnamed
 * `section` is not a `region` under the ARIA spec, so both variants serialised to
 * the same three lines of text and the two tests could not fail independently.
 */
const structure = () => ({
  overview: document.querySelector('.o-overview')?.tagName,
  header: document.querySelector('.o-overview__header')?.tagName,
});

test('should use header with section', () => {
  document.body.innerHTML = template();

  expect(structure()).toEqual({ overview: 'SECTION', header: 'HEADER' });
});

test('should not use header with div', () => {
  document.body.innerHTML = divTemplate();

  expect(structure()).toEqual({ overview: 'DIV', header: 'DIV' });
});
