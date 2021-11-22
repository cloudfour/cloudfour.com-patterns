import { useEffect } from '@storybook/client-api';

const setTextFlow = (element, { direction, writingMode } = {}) => {
  if (!element || !element.style) {
    return;
  }

  if (direction && direction !== 'inherit') {
    element.style.setProperty('direction', direction);
  } else {
    element.style.removeProperty('direction');
  }

  if (writingMode && writingMode !== 'inherit') {
    element.style.setProperty('writing-mode', writingMode);
  } else {
    element.style.removeProperty('writing-mode');
  }
};

/**
 * Sets text direction and writing-mode for stories to test logical property
 * usage.
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
export const withTextFlow = (story, context) => {
  let textFlow = context.parameters.textFlow ||
    context.globals.textFlow || {
      direction: 'inherit',
      writingMode: 'inherit',
    };

  if (typeof textFlow === 'string') {
    textFlow = JSON.parse(textFlow);
  }

  if (context.viewMode === 'story') {
    useEffect(() => {
      setTextFlow(document.body, textFlow);
    });
  } else if (context.viewMode === 'docs') {
    useEffect(() => {
      setTextFlow(document.body);
      setTextFlow(document.querySelector(`#story--${context.id}`), textFlow);
    });
  }

  return story();
};
