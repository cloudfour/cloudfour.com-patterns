/**
 * Renders the given HTML text to the DOM
 * @param htmlText The HTML text to render
 * @returns Cypress Chainable object pointing to root rendered element (same interface as `cy`)
 */
export const render = (htmlText: string) => {
  // @ts-expect-error
  if (Cypress.spec.specType !== 'component') {
    throw new Error(
      "Can't mount a component here, make sure that your test file is in componentFolder"
    );
  }
  const root = document.createElement('div');
  document.body.append(root);
  root.innerHTML = htmlText;
  // Adds a item to the output on the left panel, "RENDER", which will contain a DOM snapshot
  Cypress.log({ name: 'render', $el: Cypress.$(root) }).snapshot();
  // Allows chaining
  return cy.wrap(root, { log: false });
};
