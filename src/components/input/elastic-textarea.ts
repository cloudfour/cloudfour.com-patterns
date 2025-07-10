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
  // Provides a CSS hook for JS-only styles
  const JS_ENABLED_HOOK = 'is-elastic';
  textarea.classList.add(JS_ENABLED_HOOK);

  const minRows = Number(textarea.getAttribute('rows')) || 2;
  let rows = Number(textarea.getAttribute('rows')) || minRows;
  textarea.setAttribute('rows', String(rows));

  /** Check if the textarea is currently scrolling */
  const isScrolling = () => textarea.scrollHeight > textarea.clientHeight;

  /** Grow until the textarea stops scrolling */
  const grow = () => {
    // Store initial height of textarea
    let previousHeight = textarea.clientHeight;

    while (isScrolling()) {
      rows++;
      textarea.setAttribute('rows', String(rows));

      // Get height after rows change is made
      const newHeight = textarea.clientHeight;

      // If the height hasn't changed, break the loop
      // This safety check is to prevent an infinite loop in IE11
      if (newHeight === previousHeight) break;

      // Store the updated height for the next comparison and proceed
      previousHeight = newHeight;
    }
  };

  /** Shrink until the textarea matches the minimum rows or starts scrolling */
  const shrink = () => {
    while (!isScrolling() && rows > minRows) {
      rows--;
      textarea.setAttribute('rows', String(Math.max(rows, minRows)));

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

  // Initialize the textarea with elastic behavior on a user's input
  textarea.addEventListener('input', update);

  // Run elastic behavior when the textarea resizes
  const observer = new ResizeObserver(update);
  observer.observe(textarea);

  /**
   * Ensure the component cleans up after itself when "destroyed"
   */
  const destroy = () => {
    // Reset the state
    textarea.classList.remove(JS_ENABLED_HOOK);
    // Remove event listeners
    textarea.removeEventListener('input', update);
    // Disconnect resize observer
    observer.disconnect();
  };

  // Run the update method to set the initial size correctly
  update();

  // Return a public API for consumers of this component
  return {
    destroy,
  };
};
