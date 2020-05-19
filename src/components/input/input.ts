const updateElasticTextArea = (event, element: HTMLTextAreaElement) => {
  console.log('UPDATE ELASTIC TEXT AREA', event);

  const minRows = Number(element.dataset.minRows) || 2;
  const currentRows = Number(element.getAttribute('rows')) || minRows;
  const lastValue = element.dataset.lastValue || '';
  const isScrolling = element.scrollHeight > element.clientHeight;
  const newValue = element.value;

  if (newValue.length > lastValue.length) {
    console.log(
      'GROW',
      isScrolling,
      lastValue.length,
      newValue.length,
      currentRows,
      minRows
    );

    // This is what I'm trying to make work:
    // while (isScrolling) {
    //   element.setAttribute('rows', String(currentRows + 1));
    //   isScrolling = element.scrollHeight > element.clientHeight;
    // }

    element.setAttribute('rows', String(currentRows + 1));
  } else {
    console.log(
      'SHRINK',
      isScrolling,
      lastValue.length,
      newValue.length,
      currentRows,
      minRows
    );
    element.setAttribute('rows', String(Math.max(currentRows - 1, minRows)));
  }

  // Save the new value for comparing
  element.dataset.lastValue = newValue;
};

// Here's the dumb little add eventlister fucniton
export const createElasticTextarea = (element: HTMLTextAreaElement) => {
  console.log('CREATE ELASTIC TEXTAREA');

  // Save the current value for comparing
  element.dataset.lastValue = element.value;

  // Set the minimum rows to the initial value or 2
  element.dataset.minRows = element.getAttribute('rows') || '2';

  // Add the event listener to run the update function on input events
  element.addEventListener('input', (event) =>
    updateElasticTextArea(event, element)
  );

  // Fire the input event once to set the initial size correctly
  element.dispatchEvent(new Event('input', { bubbles: true }));

  // Return an object with the destroy method
  // so users can remove the event listener if needed
  return {
    destroy() {
      // TODO: remove event listener
      console.log('DESTROY ELASTIC TEXTAREA');
    },
  };
};
