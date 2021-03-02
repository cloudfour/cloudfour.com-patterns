/**
 * Create Sky Nav Menu
 *
 * Adds an event listener to the toggle button of a Sky Nav component for click
 * events, which runs the toggle command to show or hide the menu with animation.
 * Tesponds to breakpoint changes to show or hide the nav for large and small
 * screens. Returns an object containing a `destroy()` method to remove the
 * event listener.
 *
 * TODO:
 * [x] On small screens, the <nav> should be hidden initially.
 * [x] Selecting the Menu button should toggle the visibility of the <nav>.
 * [ ] On large screens, the <nav> should always be visible.
 *     - import design tokens for breakpoints
 *     - add event handler for breakpoint changes (update offset, visibility)
 * [ ] When toggling the nav, we should include an animation.
 * [ ] No animation should occur if the user prefers reduced motion.
 *
 * @param navButton - the toggle button for the navigation
 */
export const createSkyNav = (navButton: HTMLButtonElement) => {
  const header = navButton.offsetParent as HTMLElement;
  const menu = navButton.nextElementSibling as HTMLElement;
  console.log('CREATE SKY NAV');

  /** Update visibility of menu & navButton for breakpoint changes */
  const update = () => {
    console.log('UPDATE!');

    // If small screens, else do opposite
    navButton.setAttribute('aria-expanded', 'false');
    menu.hidden = true;

    // Center the button with a bottom offset
    // TypeScript is concerned header might be null, so wrapping this in an if()
    if (header.clientHeight) {
      navButton.style.bottom = `${
        (header.clientHeight - navButton.offsetHeight) / 2
      }px`;
    }
  };

  /** Toggle aria-expanded & hidden attributes to show or hide the menu */
  const toggle = () => {
    const expanded =
      navButton.getAttribute('aria-expanded') === 'true' || false;
    console.log('TOGGLE!', expanded, menu.hidden);

    navButton.setAttribute('aria-expanded', String(!expanded));
    menu.hidden = expanded;
  };

  /** As part of the public API, allow users to remove the event listener */
  const destroy = () => navButton.removeEventListener('click', toggle);

  // Initialize the navButton with toggle behavior
  navButton.addEventListener('click', toggle);

  // Run the update method to set the initial visibility correctly
  update();

  // Return a public API for consumers of this component
  return {
    destroy,
  };
};
