import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';

import divTemplate from './demo/div.twig';
import template from './demo/single.twig';

/**
 * These assert the element the template chose for its header and footer, which is
 * what `card.twig` documents: a `header`/`footer` inside a `div` would announce a
 * page-level banner/contentinfo landmark, so the template downgrades both to a
 * `div` unless the card is a sectioning element.
 *
 * This used to be an accessibility tree snapshot, because the Chromium of the day
 * exposed a scoped `header` as a `banner` too. Current engines follow the ARIA
 * spec, where a `header` inside an `article` is neither a banner nor a landmark at
 * all -- so an accessibility tree can no longer tell the two variants apart, and
 * the snapshots for them came out identical. The markup is where the difference
 * still lives.
 */
const structure = () => ({
  card: document.querySelector('.c-card')?.tagName,
  header: document.querySelector('.c-card__header')?.tagName,
  footer: document.querySelector('.c-card__footer')?.tagName,
});

test('should use header/footer with article', () => {
  document.body.innerHTML = template({
    show_heading: true,
    show_footer: true,
  });

  expect(structure()).toEqual({
    card: 'ARTICLE',
    header: 'HEADER',
    footer: 'FOOTER',
  });
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    'Lorem ipsum dolor sit amet',
  );
});

test('should not use header/footer with div', () => {
  document.body.innerHTML = divTemplate({
    show_heading: true,
    show_footer: true,
  });

  expect(structure()).toEqual({
    card: 'DIV',
    header: 'DIV',
    footer: 'DIV',
  });
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    'Lorem ipsum dolor sit amet',
  );
});
