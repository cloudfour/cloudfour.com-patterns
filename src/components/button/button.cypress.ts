// This is just a temporary demo
import button from './button.twig';
import { initializeButton } from './button';

import { render } from '../../../cypress/cypress-render-component';

describe('Button', () => {
  it('example test', () => {
    const root = render(button({ label: 'Example' }));
    initializeButton();
    root.findByText(/example/i).click();
  });
});
