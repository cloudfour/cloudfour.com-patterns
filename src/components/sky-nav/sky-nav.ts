import tokens from '../../compiled/tokens/js/tokens';

/**
 * Create Sky Nav Menu
 *
 * Adds an event listener to the toggle button of a Sky Nav component for click
 * events, which runs the toggle command to show or hide the menu with animation.
 * Responds to breakpoint changes to show or hide the nav for large and small
 * screens. Returns an object containing a `destroy()` method to remove the
 * event listener.
 *
 * @param navButton - the toggle button for the navigation
 */
export const initSkyNav = (navButton: HTMLButtonElement) => {
  const menu = navButton.nextElementSibling as HTMLElement;
  const navWrapper = navButton.closest('.c-sky-nav') as HTMLElement; // Review: should this use a .js- class or some different selector?
  const largeScreenMediaQuery = window.matchMedia(
    `(min-width: ${tokens.size.breakpoint.m.value})`
  );
  const reducedMotionMediaQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  /**
   * Update Menu Layout
   * Sets visibility of menu & navButton for small vs large screen layouts.
   */
  const update = () => {
    const isLargeScreen = largeScreenMediaQuery.matches;
    if (isLargeScreen) {
      navButton.removeAttribute('aria-expanded');
      menu.hidden = false;
      document.body.style.transform = '';
    } else {
      navButton.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  };

  let timeoutId = -1;

  /**
   * Toggle Menu State (expanded/closed)
   * Sets aria-expanded & hidden attributes to show or hide the menu.
   */
  const toggle = () => {
    const isExpanded = navButton.getAttribute('aria-expanded') === 'true';

    navButton.setAttribute('aria-expanded', String(!isExpanded));

    if (reducedMotionMediaQuery.matches) {
      menu.hidden = isExpanded;
      return;
    }

    // TODO: Design token
    const duration = 400;

    clearTimeout(timeoutId);

    menu.hidden = false;
    const heightDiff = menu.getBoundingClientRect().height;
    if (isExpanded) {
      document.body.style.transform = '';

      timeoutId = setTimeout(() => {
        menu.hidden = true;

      }, duration) as any as number;
    } else {
      document.body.style.transform = `translateY(${heightDiff}px)`;
    }
  };

  navButton.addEventListener('click', toggle);
  // Run the update method when the media query status changes
  largeScreenMediaQuery.addEventListener('change', update);

  // Run the update method once to set the initial layout correctly
  update();

  /** Clean up event listeners */
  const destroy = () => {
    navButton.removeEventListener('click', toggle);
    largeScreenMediaQuery.removeEventListener('change', update);
  };

  // Return a public API for consumers of this component
  return { destroy };
};
