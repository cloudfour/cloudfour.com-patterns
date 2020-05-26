/**
 * Injects the stylesheet in to the root as a <style> tag, if it is not there already
 */
const createStyleSheetIfMissing = () => {
  if (document.querySelector('.cloudfour-cypress-stylesheet')) return;
  const stylesheet = document.createElement('style');
  stylesheet.classList.add('cloudfour-cypress-stylesheet');
  document.head.append(stylesheet);
  cy.readFile('./dist/standalone.css').then((contents) => {
    stylesheet.textContent = contents;
  });
};

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
  // Clear out any existing markup
  document.body.innerHTML = '';
  const root = document.createElement('div');
  document.body.append(root);
  root.innerHTML = htmlText;
  createStyleSheetIfMissing();
  // Adds a item to the output on the left panel, "RENDER", which will contain a DOM snapshot
  Cypress.log({ name: 'render', $el: Cypress.$(root) }).snapshot();
  // Allows chaining
  return cy.wrap(root, { log: false });
};
