import { render } from '../../../cypress/cypress-render-component';
import skyNavMarkup from './sky-nav.twig';
import { createSkyNav } from './sky-nav';
import menu from './demo/menu.json';

describe('Sky Nav', () => {
  it('can be opened on small screens', () => {
    render(skyNavMarkup({ includeMainDemo: true, menu }));
    cy.viewport('iphone-6');
    cy.get('.js-sky-nav-menu-toggle').then((navButton) => {
      createSkyNav(navButton.get(0) as HTMLButtonElement);
    });

    // Initial state: menu is closed
    cy.findByRole('button').should('have.attr', 'aria-expanded', 'false');
    cy.findByRole('list').should('not.exist');

    // After click: menu is open
    cy.findByRole('button')
      .click()
      .should('have.attr', 'aria-expanded', 'true');
    cy.findByRole('list').should('not.have.attr', 'hidden');
  });

  it('is expanded on large screens', () => {
    render(skyNavMarkup({ includeMainDemo: true, menu }));
    cy.get('.js-sky-nav-menu-toggle').then((navButton) => {
      createSkyNav(navButton.get(0) as HTMLButtonElement);
    });

    // Initial state: list is visible, button is hidden
    cy.findByRole('button').should('not.exist');
    cy.findByRole('list').should('exist');
  });
});
