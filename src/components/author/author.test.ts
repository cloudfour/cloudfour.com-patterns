import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';

import template from './author.twig';

test('Short date formatting', () => {
  document.body.innerHTML = template({
    // The avatar is not included because I couldn't figure out how to include it.
    // For the purposes of this test, though, it is not important so I left it out.
    authors: [{ name: 'Shakira Isabel Mebarak Ripoll' }],
    date: new Date('March 31, 2021'),
    date_format: 'short',
  });

  // The short date formatting applies to the visible date text
  // (not our visually hidden screen reader text)
  expect(screen.getByText('Mar 31, 2021')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
});
