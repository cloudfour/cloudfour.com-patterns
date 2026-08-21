import tokens from '../../compiled/tokens/js/tokens.js';

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
  const navWrapper = navButton.closest('.js-sky-nav') as HTMLElement;
  const largeScreenMediaQuery = window.matchMedia(
    `(min-width: ${tokens.size.breakpoint.m.value})`,
  );
  const reducedMotionMediaQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );

  // The Sky Nav component has inline synchronous JS logic to swap `no-js` for an
  // `is-loading` state, which removes the layout shift at smaller viewports. Neither
  // applies once we get here: this function running is itself proof that JS is
  // available and ready to take over.
  //
  // `no-js` is cleared here rather than relying solely on that inline script because
  // the script only runs when the markup is parsed by the browser. Anything that
  // injects the template as a string -- Storybook re-rendering a story, for one --
  // skips it, which would leave the menu permanently open with no toggle.
  navWrapper.classList.remove('no-js', 'is-loading');

  /**
   * Update Menu Layout
   * Sets visibility of menu & navButton for small vs large screen layouts.
   */
  const update = () => {
    const isLargeScreen = largeScreenMediaQuery.matches;
    if (isLargeScreen) {
      navButton.removeAttribute('aria-expanded');
      menu.hidden = false;
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

    const duration = Number.parseFloat(tokens.time.transition.slow.value);
    const transition = `transform ${duration}s ${tokens.ease.in_out.value}`;
    clearTimeout(timeoutId);

    menu.hidden = false;
    const heightDiff = menu.getBoundingClientRect().height;
    if (isExpanded) {
      // Closing menu: slide the elements up before hiding the menu
      document.body.style.setProperty('transition', transition);
      document.body.style.setProperty(
        'transform',
        `translateY(${-heightDiff}px)`,
      );

      timeoutId = setTimeout(() => {
        menu.hidden = true;
        document.body.style.removeProperty('transition');
        document.body.style.removeProperty('transform');
      }, duration * 1000) as any as number;
    } else {
      // Opening menu: start the elements higher than their "resting position" and then slide them down
      document.body.style.setProperty(
        'transform',
        `translateY(${-heightDiff}px)`,
      );

      // Flush changes to the DOM
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      navWrapper.offsetWidth;
      document.body.style.setProperty('transition', transition);
      document.body.style.removeProperty('transform');
      timeoutId = setTimeout(() => {
        document.body.style.removeProperty('transition');
      }, duration * 1000) as any as number;
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
