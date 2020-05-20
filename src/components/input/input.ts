/**
 * Grow Elastic TextArea
 *
 * Increases the `rows` attribute of a `textarea` until it no longer scrolls.
 *
 * @param {HTMLTextAreaElement} element - the target `textarea` element
 */
const growElasticTextArea = (element: HTMLTextAreaElement) => {
  const minRows = Number(element.dataset.minRows);
  let rows = Number(element.getAttribute('rows')) || minRows;
  let isScrolling = element.scrollHeight > element.clientHeight;

  // Grow until we stop scrolling
  while (isScrolling) {
    rows += 1;
    element.setAttribute('rows', String(rows));
    isScrolling = element.scrollHeight > element.clientHeight;
  }
};

/**
 * Shrink Elastic TextArea
 *
 * Decreases the `rows` attribute of a `textarea` until it begins scrolling.
 *
 * @param {HTMLTextAreaElement} element - the target `textarea` element
 */
const shrinkElasticTextArea = (element: HTMLTextAreaElement) => {
  const minRows = Number(element.dataset.minRows);
  let rows = Number(element.getAttribute('rows')) || minRows;
  let isScrolling = element.scrollHeight > element.clientHeight;

  // Shrink until we hit the minimum rows or start scrolling
  for (let i = rows; i >= minRows; i--) {
    rows = i;
    element.setAttribute('rows', String(Math.max(rows, minRows)));
    isScrolling = element.scrollHeight > element.clientHeight;

    // If we're scrolling, then we shrank too much, so grow a bit and stop
    if (isScrolling) {
      growElasticTextArea(element);
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
 * @param {HTMLTextAreaElement} element - the target `textarea` element
 */
const updateElasticTextArea = ({ target }: { target: HTMLTextAreaElement }) => {
  console.log('UPDATE ELASTIC TEXT AREA', typeof target);
  const lastValue = target.dataset.lastValue || '';
  const newValue = target.value;

  // Check whether to grow or shrink
  if (newValue.length > lastValue.length) {
    console.log('GROW');
    growElasticTextArea(target);
  } else {
    console.log('SHRINK');
    shrinkElasticTextArea(target);
  }

  // Save the new value for comparing
  target.dataset.lastValue = newValue;
};

/**
 * Create Elastic TextArea
 *
 * Given a textarea, adds dataset attributes for the existing value and the
 * minimum number of rows, for use in the update function, which is added to
 * an event listener. Returns an object containing the `destroy()` method to
 * remove the event listener.
 *
 * @param {HTMLTextAreaElement} element - the target `textarea` element
 * @returns {object} object containing a `destroy()` method
 */
export const createElasticTextarea = (element: HTMLTextAreaElement) => {
  console.log('CREATE ELASTIC TEXTAREA');

  // Save the current value for comparing
  element.dataset.lastValue = element.value || '';

  // Set the minimum rows to the initial `rows` value or 2
  element.dataset.minRows = element.getAttribute('rows') || '2';

  // Add an event listener to run the update function after input events
  element.addEventListener('input', updateElasticTextArea);

  // Fire an input event to set the initial size correctly
  element.dispatchEvent(new Event('input'));

  // Return an object with the destroy method
  // so users can remove the event listener if needed
  return {
    destroy() {
      console.log('DESTROY ELASTIC TEXTAREA');
      element.removeEventListener('input', updateElasticTextArea);
    },
  };
};
