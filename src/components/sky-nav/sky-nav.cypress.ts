import { render } from '../../../cypress/cypress-render-component';
import skyNavMarkup from './sky-nav.twig';
import { createSkyNav } from './sky-nav';
import menu from './demo/menu.json';

describe('Sky Nav', () => {
  it('On small screens the menu starts closed & the button opens it', () => {
    render(
      skyNavMarkup({
        includeMainDemo: true,
        menu,
      })
    );
    cy.viewport('iphone-6');
    cy.findByRole('button')
      .as('button')
      .then((navButton) => {
        createSkyNav(navButton.get(0) as HTMLButtonElement);
      });

    // Initial state: menu is closed
    cy.get('@button').should('have.attr', 'aria-expanded', 'false');
    cy.findByRole('list').should('not.exist');

    // After click: menu is open
    cy.get('@button').click().should('have.attr', 'aria-expanded', 'true');
    cy.findByRole('list').should('not.have.attr', 'hidden');
  });

  it('On large screens the menu is visible & the button is hidden', () => {
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
