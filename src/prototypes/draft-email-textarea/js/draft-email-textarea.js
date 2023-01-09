/**
 * The contents of this function will be inlined in a Gutenberg Custom HTML block
 */
export const runProposedInlineJS = () => {
  // The elements all will be a part of the same Gutenberg Custom HTML block.
  // I chose to use IDs since the HTML and JS are scoped to the same Gutenberg
  // block (the JS functionaly won't be shared elsewhere, so I didn't use classes)
  const copyBtn = document.getElementById('copy-btn');
  const draftEmailBtn = document.getElementById('draft-email-btn');
  const draftEl = document.getElementById('email-draft');
  const copySuccessTooltipEl = document.getElementById('copy-success-tooltip');
  const copyFailTooltipEl = document.getElementById('copy-fail-tooltip');

  // All the things required to run this feature
  const requirements = [
    copyBtn,
    draftEmailBtn,
    draftEl,
    copySuccessTooltipEl,
    copyFailTooltipEl,
    navigator,
    navigator.clipboard,
    navigator.clipboard.writeText,
  ];
  // Handle use case when all requirements are not met
  if (!requirements.every((requirement) => requirement)) {
    // Hide the "copy" btn since it will not be functional
    if (copyBtn) copyBtn.hidden = true;
    // Exit this script
    return;
  }

  // Keep track of the tooltip timeout ID to clear it if the tooltip is
  // activated again before it is hidden
  let hideTooltipDelayTimeoutId;

  /**
   * Handles showing & hiding the "copy" action tooltip
   * @param {HTMLElement} tooltipEl
   * @param {Number} [hideTooltipDelay=4000]
   */
  const showTooltip = (tooltipEl, hideTooltipDelay = 4000) => {
    // Unhide it and start the "intro" animation
    tooltipEl.hidden = false;
    tooltipEl.classList.add('is-animating-intro');
    // Clear any existing timeouts
    if (hideTooltipDelayTimeoutId) clearTimeout(hideTooltipDelayTimeoutId);
    // Hide the tooltip after a delay
    hideTooltipDelayTimeoutId = setTimeout(() => {
      tooltipEl.classList.remove('is-animating-intro');
      tooltipEl.classList.add('is-animating-outro');
    }, hideTooltipDelay);
    // Listen for when the tooltip animation ends
    tooltipEl.addEventListener('animationend', onTooltipAnimationEnd);
  };

  /**
   * Handler for when the tooltip animations end
   * @param {AnimationEvent} e
   */
  const onTooltipAnimationEnd = (e) => {
    const tooltipEl = e.target;
    // When the "outro" animation ends, perform cleanup
    if (e.animationName === 'tooltipOutro') {
      tooltipEl.hidden = true;
      tooltipEl.classList.remove('is-animating-outro');
      tooltipEl.removeEventListener('animationend', onTooltipAnimationEnd);
    }
  };

  /**
   * Handles the "copy" button action
   */
  const onCopyClick = () => {
    // Using the Clipboard API, attempt to add the draft message to clipboard
    navigator.clipboard
      .writeText(draftEl.value)
      .then(() => showTooltip(copySuccessTooltipEl))
      .catch(() => showTooltip(copyFailTooltipEl));
  };

  // Handles the "Draft email" link action
  const onDraftEmailClick = (e) => {
    // Get the draft message subject & body text. This ensures the mailto link
    // is updated in case the user started typing their message in the
    // textarea input.
    const msgSubject = encodeURIComponent(draftEl.dataset.messageSubject);
    const msgBody = encodeURIComponent(draftEl.value);

    // Update the mailto link with the new values
    // The default mailto link behavior will then use these updated values
    draftEmailBtn.setAttribute(
      'href',
      `mailto:info@cloudfour.com?subject=${msgSubject}&body=${msgBody}`
    );
  };

  // Set up event listeners
  copyBtn.addEventListener('click', onCopyClick);
  draftEmailBtn.addEventListener('click', onDraftEmailClick);

  // For the Storybook demo, pass back a function to remove all event listeners
  return {
    destroy: () => {
      copyBtn.removeEventListener('click', onCopyClick);
      draftEmailBtn.removeEventListener('click', onDraftEmailClick);
    },
  };
};

/**
 * For the purposes of this prototype demo, this was the only way I could figure
 * out how to include a string of text with spaces between each line of text.
 * When I tried this in the MDX file, it would not work.
 */
export const forDemoPurposesOnlyText = `Hi there,

My name is [Firstname Lastname], I’m a [role] at [organization].

I’m reaching out to discuss [project, question, challenge]. [Additional details, if any.]

Our budget for this effort is [budget, range, etc.] and we’re interested in wrapping up in [timeframe].

I’m available to chat [potential meeting times], let me know if any of those work for you.

Have a great day!

[Firstname Lastname]`;
