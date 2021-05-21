import { useEffect } from '@storybook/client-api';

/**
 * Removes current theme classes on an element and applies a new theme class
 * if provided.
 * @param {HTMLElement} element - Element to add/remove theme classes from
 * @param {string} [theme] - New theme to apply.
 */
const updateTheme = (element, theme) => {
  if (!element || !element.classList) {
    return;
  }

  const themes = [];
  element.classList.forEach((className) => {
    if (className.startsWith('t-') && className !== theme) {
      themes.push(className);
    }
  });

  if (themes.length > 0) {
    element.classList.remove(...themes);
  }

  if (theme) {
    element.classList.add(theme);
  }
};

/**
 * Adds theme class to containing story elements.
 *
 * This unfortunately does not work with non-inline stories in Docs view due to
 * some open Storybook issues, specifically
 * {@link https://github.com/storybookjs/storybook/issues/14477|#14477} and
 * {@link https://github.com/storybookjs/storybook/issues/13444|#13444}.
 *
 * @param {function} story
 * @param {object} context
 * @returns {*} Result of story function.
 */
export const withTheme = (story, context) => {
  const theme = context.parameters.theme || context.globals.theme;

  if (context.viewMode === 'story') {
    // In canvas view, theme the root HTML element
    useEffect(() => {
      updateTheme(document.body, theme);
    });
  } else if (context.viewMode === 'docs') {
    useEffect(() => {
      // Remove any existing theme classes from the root element
      updateTheme(document.body);
      // Query for the most appropriate story element
      const storyElement = document.querySelector(`#story--${context.id}`);
      // Only proceed if we actually found the relevant story.
      if (storyElement) {
        const previewElement = storyElement.closest('.docs-story');
        updateTheme(previewElement, theme);
      }
    });
  }

  return story();
};
