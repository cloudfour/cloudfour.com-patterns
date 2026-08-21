import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';

import template from './alert.twig';

test('should set an `id` attribute', () => {
  document.body.innerHTML = template({ id: 'my-id', role: 'status' });

  expect(screen.getByRole('status')).toHaveAttribute('id', 'my-id');
});
