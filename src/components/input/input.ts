/**
 * Create Elastic TextArea
 *
 * Adds an event listener to a `textarea` elment that responds to input events
 * by either increasing or decreasing the `rows` attribute based on whether the
 * `textarea` is scrolling or not. Returns an object containing a `destroy()`
 * method to remove the event listener.
 *
 * 1. Sanity check to prevent an infinite loop if the textarea has a fixed height
 *    @see https://github.com/cloudfour/cloudfour.com-patterns/pull/716#discussion_r428349375
 *
 * @param textarea - the target `textarea` element
 */
export const createElasticTextArea = (textarea: HTMLTextAreaElement) => {
  const maxRows = 500; // 1
  const minRows = Number(textarea.getAttribute('rows')) || 2;
  let rows = Number(textarea.getAttribute('rows')) || minRows;
  let isScrolling = false;

  /** Check if the textarea is currently scrolling */
  const checkScrolling = () => textarea.scrollHeight > textarea.clientHeight;

  /** Grow until the textarea stops scrolling */
  const grow = () => {
    while (isScrolling && rows < maxRows) {
      rows++;
      textarea.setAttribute('rows', String(rows));
      isScrolling = checkScrolling();
    }
  };

  /** Shrink until the textarea matches the minimum rows or starts scrolling */
  const shrink = () => {
    while (!isScrolling && rows > minRows) {
      rows--;
      textarea.setAttribute('rows', String(Math.max(rows, minRows)));
      isScrolling = checkScrolling();

      if (isScrolling) {
        grow();
        break;
      }
    }
  };

  /** Decide whether to grow or shrink the textarea */
  const update = () => {
    isScrolling = checkScrolling();

    if (isScrolling) {
      grow();
    } else {
      shrink();
    }
  };

  /** Remove the event listener from the textarea */
  const destroy = () => textarea.removeEventListener('input', update);

  // 1. Add an event listener to run the update function after input events
  textarea.addEventListener('input', update);

  // 2. Fire an input event to set the initial size correctly
  textarea.dispatchEvent(new Event('input'));

  // 3. Return an object with the destroy method to remove the event listener
  return { destroy };
};
