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
  const firstBtnWrapper = buttonSwapEl.querySelector(
    '.js-button-swap__first-btn-wrapper'
  ) as HTMLElement;
  const secondBtnWrapper = buttonSwapEl.querySelector(
    '.js-button-swap__second-btn-wrapper'
  ) as HTMLElement;

  // The buttons
  const firstBtn = getButton(firstBtnWrapper);
  const secondBtn = getButton(secondBtnWrapper);

  /**
   * Performs all firstBtn click actions
   */
  const onFirstBtnClick = (event: Event) => {
    firstBtnWrapper.hidden = true;
    secondBtnWrapper.hidden = false;

    const statusMsg = getStatusMessage(secondBtnWrapper);
    statusMsg.setAttribute('role', 'alert');
    statusMsg.focus();

    if (initialCallback) {
      initialCallback(event);
    }
  };

  /**
   * Performs all secondBtn click actions
   */
  const onSecondBtnClick = (event: Event) => {
    secondBtnWrapper.hidden = true;
    firstBtnWrapper.hidden = false;

    const statusMsg = getStatusMessage(firstBtnWrapper);
    statusMsg.setAttribute('role', 'alert');
    statusMsg.focus();

    if (swappedCallback) {
      swappedCallback(event);
    }
  };

  const destroy = () => {
    // Clean up event listeners
    firstBtn.removeEventListener('click', onFirstBtnClick);
    secondBtn.removeEventListener('click', onSecondBtnClick);
  };

  // Intialize
  firstBtn.addEventListener('click', onFirstBtnClick);
  secondBtn.addEventListener('click', onSecondBtnClick);

  // Return a public API for consumers of this component
  return { destroy };
};
