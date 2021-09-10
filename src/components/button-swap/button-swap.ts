/**
 * Helper to get the button from the supplied wrapper element
 */
const getButton = (wrapper: HTMLElement) =>
  wrapper.querySelector('.js-button-swap__button') as HTMLButtonElement;

/**
 * Helper to get the status message from the supplied wrapper element
 */
const getStatusMessage = (wrapper: HTMLElement) =>
  wrapper.querySelector('.js-button-swap__message') as HTMLElement;

/**
 * Performs click actions
 */
const onClick = ({
  event,
  hiddenWrapper,
  visibleWrapper,
  callback,
}: {
  event: Event;
  hiddenWrapper: HTMLElement;
  visibleWrapper: HTMLElement;
  callback?: (event: Event) => void;
}) => {
  hiddenWrapper.hidden = true;
  visibleWrapper.hidden = false;

  const statusMsg = getStatusMessage(visibleWrapper);
  statusMsg.setAttribute('role', 'alert');
  statusMsg.focus();

  if (callback) {
    callback(event);
  }
};

/**
 * Button swap
 *
 * Swaps two buttons by toggling the `hidden` attribute on the wrapper for each
 * button + visually hidden message group; only one button + visually hidden
 * message is displayed at a time.
 */
export const initButtonSwap = (
  buttonSwapEl: HTMLElement,
  {
    initialCallback,
    swappedCallback,
  }: {
    initialCallback?: (event: Event) => void;
    swappedCallback?: (event: Event) => void;
  } = {}
) => {
  // The group wrappers
  const initialButtonWrapper = buttonSwapEl.querySelector(
    '.js-button-swap__initial-button-wrapper'
  ) as HTMLElement;
  const swappedButtonWrapper = buttonSwapEl.querySelector(
    '.js-button-swap__swapped-button-wrapper'
  ) as HTMLElement;

  // The buttons
  const initialButton = getButton(initialButtonWrapper);
  const swappedButton = getButton(swappedButtonWrapper);

  const onInitialButtonClick = (event: Event) => {
    onClick({
      event,
      hiddenWrapper: initialButtonWrapper,
      visibleWrapper: swappedButtonWrapper,
      callback: initialCallback,
    });
  };

  const onSwappedButtonClick = (event: Event) => {
    onClick({
      event,
      hiddenWrapper: swappedButtonWrapper,
      visibleWrapper: initialButtonWrapper,
      callback: swappedCallback,
    });
  };

  const destroy = () => {
    // Clean up event listeners
    initialButton.removeEventListener('click', onInitialButtonClick);
    swappedButton.removeEventListener('click', onSwappedButtonClick);
  };

  // Intialize
  initialButton.addEventListener('click', onInitialButtonClick);
  swappedButton.addEventListener('click', onSwappedButtonClick);

  // Return a public API for consumers of this component
  return { destroy };
};
