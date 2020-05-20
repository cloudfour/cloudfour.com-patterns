import textInputHTML from './input.twig';
import { createElasticTextArea } from './input';

import { render } from '../../../cypress/cypress-render-component';

describe('Elastic Textarea', () => {
  it('Resizes correctly with no rows attribute', () => {
    render(
      textInputHTML({
        class: 'c-input--elastic js-elastic-textarea',
        type: 'textarea',
      })
    );
    const textarea = cy.get('.js-elastic-textarea');

    textarea.invoke('css', 'max-width', '500px');

    textarea.then((textarea) => {
      createElasticTextArea(textarea.get(0) as HTMLTextAreaElement);
    });

    // Default of 2 rows
    textarea.should('have.attr', 'rows', '2');

    // This wraps, so both lines should be full now
    textarea.type(
      'this is a very long sentence with a lot of words that make it wrap'
    );
    textarea.should('have.attr', 'rows', '2');

    // Enter is pressed, so now there should be 3 lines (this line doesn't wrap)
    textarea.type('{enter}this is a very long sentence with a lot');
    textarea.should('have.attr', 'rows', '3');

    // After emptying it out, it should have 2 rows, since that is the default
    textarea.clear();
    textarea.should('have.attr', 'rows', '2');
  });

  it('Allows you to override the minimum number of rows', () => {
    render(
      textInputHTML({
        class: 'c-input--elastic js-elastic-textarea',
        type: 'textarea',
        rows: 1,
      })
    );
    const textarea = cy.get('.js-elastic-textarea');

    textarea.then((textarea) => {
      createElasticTextArea(textarea.get(0) as HTMLTextAreaElement);
    });

    textarea.invoke('css', 'max-width', '500px');

    // Starts at 1 row since we set rows attribute
    textarea.should('have.attr', 'rows', '1');

    textarea.type('I have {enter}{enter}{enter} a long message');
    textarea.should('have.attr', 'rows', '4');

    textarea.clear();

    // After emptying it out, it should have 1 rows, since that is what we initialized `rows` to
    textarea.should('have.attr', 'rows', '1');
  });
});
