/**
 * Grow Elastic TextArea
 *
 * Increases the `rows` attribute of a `textarea` until it no longer scrolls.
 *
 * @param {HTMLTextAreaElement} textarea - the target `textarea` element
 */
const growElasticTextArea = (textarea: HTMLTextAreaElement) => {
  const minRows = Number(textarea.dataset.minRows);
  let rows = Number(textarea.getAttribute('rows')) || minRows;
  let isScrolling = textarea.scrollHeight > textarea.clientHeight;

  // Grow until we stop scrolling
  while (isScrolling) {
    rows += 1;
    textarea.setAttribute('rows', String(rows));
    isScrolling = textarea.scrollHeight > textarea.clientHeight;
  }
};

/**
 * Shrink Elastic TextArea
 *
 * Decreases the `rows` attribute of a `textarea` until it begins scrolling.
 *
 * @param {HTMLTextAreaElement} textarea - the target `textarea` element
 */
const shrinkElasticTextArea = (textarea: HTMLTextAreaElement) => {
  const minRows = Number(textarea.dataset.minRows);
  let rows = Number(textarea.getAttribute('rows')) || minRows;
  let isScrolling = textarea.scrollHeight > textarea.clientHeight;

  // Shrink until we hit the minimum rows or start scrolling
  for (let i = rows; i >= minRows; i--) {
    rows = i;
    textarea.setAttribute('rows', String(Math.max(rows, minRows)));
    isScrolling = textarea.scrollHeight > textarea.clientHeight;

    // If we're scrolling, then we shrank too much, so grow a bit and stop
    if (isScrolling) {
      growElasticTextArea(textarea);
      break;
    }
  }
};

/**
 * Update Elastic TextArea
 *
 * When a textarea is updated, compares the new value to the previous value
 * (from a dataset attribute) to determine whether to grow or shrink.
 *
 * Note: Ideally we'd destructure `event.target` from the parameters and declare
 * the type directly, since we don't care about the rest of the `event` object.
 * Unfortunately, that caused some TS problems. If someone finds a solution,
 * we should update this function to take `{target}` as the only parameter.
 * @see https://stackoverflow.com/a/28900856/4898045
 *
 * @param {Event} event - the input event on the target `textarea`
 */
const updateElasticTextArea = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  const lastValue = textarea.dataset.lastValue || '';
  const newValue = textarea.value;

  // Check whether to grow or shrink
  if (newValue.length > lastValue.length) {
    growElasticTextArea(textarea);
  } else {
    shrinkElasticTextArea(textarea);
  }

  // Save the new value for comparing
  textarea.dataset.lastValue = newValue;
};

/**
 * Create Elastic TextArea
 *
 * Given a textarea, adds dataset attributes for the existing value and the
 * minimum number of rows, for use in the update function, which is added to
 * an event listener. Returns an object containing the `destroy()` method to
 * remove the event listener.
 *
 * @param {HTMLTextAreaElement} textarea - the target `textarea` element
 * @returns {object} object containing a `destroy()` method
 */
export const createElasticTextarea = (textarea: HTMLTextAreaElement) => {
  // Save the current value for comparing
  textarea.dataset.lastValue = textarea.value || '';

  // Set the minimum rows to the initial `rows` value or 2
  textarea.dataset.minRows = textarea.getAttribute('rows') || '2';

  // Add an event listener to run the update function after input events
  textarea.addEventListener('input', updateElasticTextArea);

  // Fire an input event to set the initial size correctly
  textarea.dispatchEvent(new Event('input'));

  // Return an object with the destroy method
  // so users can remove the event listener if needed
  return {
    destroy() {
      textarea.removeEventListener('input', updateElasticTextArea);
    },
  };
};
