export interface ElasticTextAreaOpts {
  disableResize?: boolean;
}

/**
 * Create Elastic TextArea
 *
 * Adds an event listener to a `textarea` elment that responds to input events
 * by either increasing or decreasing the `rows` attribute based on whether the
 * `textarea` is scrolling or not. Returns an object containing a `destroy()`
 * method to remove the event listener.
 *
 * @param textArea - the target `textarea` element
 * @param {ElasticTextAreaOpts} [elasticTextAreaOpts] - Disables the textarea resize functionality if set to `true`
 */
export const createElasticTextArea = (
  textArea: HTMLTextAreaElement,
  elasticTextAreaOpts: ElasticTextAreaOpts = {}
) => {
  const minRows = Number(textArea.getAttribute('rows')) || 2;
  let rows = Number(textArea.getAttribute('rows')) || minRows;
  textArea.setAttribute('rows', String(rows));

  // Disables the native textarea resize functionality via inline CSS
  if (elasticTextAreaOpts.disableResize === true) {
    textArea.style.resize = 'none';
  }

  /** Check if the textarea is currently scrolling */
  const isScrolling = () => textArea.scrollHeight > textArea.clientHeight;

  /** Grow until the textarea stops scrolling */
  const grow = () => {
    // Store initial height of textarea
    let previousHeight = textArea.clientHeight;

    while (isScrolling()) {
      rows++;
      textArea.setAttribute('rows', String(rows));

      // Get height after rows change is made
      const newHeight = textArea.clientHeight;

      // If the height hasn't changed, break the loop
      // This sanity check is to prevent an infinite loop in IE11
      if (newHeight === previousHeight) break;

      // Store the updated height for the next comparison and proceed
      previousHeight = newHeight;
    }
  };

  /** Shrink until the textarea matches the minimum rows or starts scrolling */
  const shrink = () => {
    while (!isScrolling() && rows > minRows) {
      rows--;
      textArea.setAttribute('rows', String(Math.max(rows, minRows)));

      if (isScrolling()) {
        grow();
        break;
      }
    }
  };

  /** Decide whether to grow or shrink the textarea */
  const update = () => {
    if (isScrolling()) {
      grow();
    } else {
      shrink();
    }
  };

  /** As part of the public API, allow users to remove the event listener */
  const destroy = () => textArea.removeEventListener('input', update);

  // Initialize the textarea with elastic behavior
  textArea.addEventListener('input', update);

  // Run the update method to set the initial size correctly
  update();

  // Return a public API for consumers of this component
  return {
    destroy,
  };
};
