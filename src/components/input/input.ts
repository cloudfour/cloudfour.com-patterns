/**
 * Create Elastic TextArea
 *
 * TODO: update description
 * Given a textarea, adds dataset attributes for the existing value and the
 * minimum number of rows, for use in the update function, which is added to
 * an event listener. Returns an object containing the `destroy()` method to
 * remove the event listener.
 *
 * @param textarea - the target `textarea` element
 */
export const createElasticTextArea = (textarea: HTMLTextAreaElement) => {
  const minRows = Number(textarea.getAttribute('rows')) || 2;
  let rows = Number(textarea.getAttribute('rows')) || minRows;
  let isScrolling = false;
  let lastValue = textarea.value || '';
  console.log('CREATE ELASTIC TEXTAREA', isScrolling, rows, minRows);

  /** Check if the textarea is currently scrolling */
  const checkScrolling = () => textarea.scrollHeight > textarea.clientHeight;

  /** Grow until the textarea stops scrolling */
  const grow = () => {
    console.log('GROW', isScrolling);
    while (isScrolling) {
      rows++;
      textarea.setAttribute('rows', String(rows));
      isScrolling = checkScrolling();
    }
  };

  /** Shrink until the textarea matches the minimum rows or starts scrolling */
  const shrink = () => {
    console.log('SHRINK', isScrolling, rows, minRows);
    while (!isScrolling && rows > minRows) {
      rows--;
      textarea.setAttribute('rows', String(Math.max(rows, minRows)));
      isScrolling = checkScrolling();

      // If we're scrolling, then we shrank too much, so grow a bit and stop
      if (isScrolling) {
        grow();
        break;
      }
    }
  };

  /** Decide whether to grow or shrink the textarea */
  const update = () => {
    const newValue = textarea.value;
    isScrolling = checkScrolling();
    console.log('UPDATE', isScrolling);

    // Check whether to grow or shrink
    if (newValue.length > lastValue.length) {
      grow();
    } else {
      shrink();
    }

    // Save the new value for comparing
    lastValue = newValue;
  };

  /** Remove the event listener from the textarea */
  const destroy = () => {
    console.log('DESTROY');
    textarea.removeEventListener('input', update);
  };

  // 1. Add an event listener to run the update function after input events
  textarea.addEventListener('input', update);

  // 2. Fire an input event to set the initial size correctly
  textarea.dispatchEvent(new Event('input'));

  // 3. Return an object with the destroy method to remove the event listener
  return {
    destroy,
  };
};
