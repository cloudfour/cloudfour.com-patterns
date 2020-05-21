/**
 * Create Elastic TextArea
 *
 * Adds an event listener to a `textarea` elment that responds to input events
 * by either increasing or decreasing the `rows` attribute based on whether the
 * `textarea` is scrolling or not. Returns an object containing a `destroy()`
 * method to remove the event listener.
 *
 * @param textarea - the target `textarea` element
 */
export const createElasticTextArea = (textarea: HTMLTextAreaElement) => {
  const maxRows = 500; // Used to prevent infinite loop if textarea has fixed height
  const minRows = Number(textarea.getAttribute('rows')) || 2;
  let rows = Number(textarea.getAttribute('rows')) || minRows;
  let isScrolling = false;

  /** Check if the textarea is currently scrolling */
  const getIsScrolling = () => textarea.scrollHeight > textarea.clientHeight;

  /** Grow until the textarea stops scrolling */
  const grow = () => {
    while (isScrolling && rows < maxRows) {
      rows++;
      textarea.setAttribute('rows', String(rows));
      isScrolling = getIsScrolling();
    }
  };

  /** Shrink until the textarea matches the minimum rows or starts scrolling */
  const shrink = () => {
    while (!isScrolling && rows > minRows) {
      rows--;
      textarea.setAttribute('rows', String(Math.max(rows, minRows)));
      isScrolling = getIsScrolling();

      if (isScrolling) {
        grow();
        break;
      }
    }
  };

  /** Decide whether to grow or shrink the textarea */
  const update = () => {
    isScrolling = getIsScrolling();

    if (isScrolling) {
      grow();
    } else {
      shrink();
    }
  };

  /** As part of the public API, allow users to remove the event listener */
  const destroy = () => textarea.removeEventListener('input', update);

  // Initialize the textarea with elastic behavior
  textarea.addEventListener('input', update);

  // Fire an input event to set the initial size correctly
  textarea.dispatchEvent(new Event('input'));

  // Return a public API for consumers of this component
  return {
    destroy,
  };
};
