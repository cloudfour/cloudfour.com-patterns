import { render } from '../../../cypress/cypress-render-component';
import skyNavMarkup from './sky-nav.twig';
import { createSkyNav } from './sky-nav';
import menu from './demo/menu.json';

describe('Sky Nav', () => {
  it('On small screens the menu starts closed & the menu button opens it', () => {
    render(skyNavMarkup({ includeMainDemo: true, menu }));
    const navButton = cy.get('.js-sky-nav-menu-toggle');
    navButton.then((navButton) => {
      createSkyNav(navButton.get(0) as HTMLButtonElement);
    });
    cy.viewport('iphone-6');

    // Note: The following set of `findByRole` selectors feels redundant, and
    // we'd like to save them to variables, but that causes the test to fail
    // for reasons that are unclear. For now, we'll just keep finding. - SV

    // Initial state: menu is closed
    cy.findByRole('button').should('have.attr', 'aria-expanded', 'false');
    cy.findByRole('list').should('not.exist');

    cy.findByRole('button').click();

    // After click: menu is open
    cy.findByRole('button').should('have.attr', 'aria-expanded', 'true');
    cy.findByRole('list').should('not.have.attr', 'hidden');
  });

  it('On large screens the menu button is hidden', () => {
    render(skyNavMarkup({ includeMainDemo: true, menu }));
    const navButton = cy.get('.js-sky-nav-menu-toggle');
    navButton.then((navButton) => {
      createSkyNav(navButton.get(0) as HTMLButtonElement);
    });

    // Initial state: list is visible, button is hidden
    cy.findByRole('button').should('not.be.visible');
    cy.findByRole('list').should('exist');
  });
});
