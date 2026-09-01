import { useEffect } from 'storybook/preview-api';

import { createElasticTextArea } from '../../components/input/elastic-textarea.ts';

import './demo/demo.scss';
import prototypeDemo from './demo/demo.twig';
import {
  forDemoPurposesOnlyText,
  runProposedInlineJS,
} from './js/draft-email-textarea.js';

const prototypeData = {
  draftSubject: 'Discuss potential project',
  draftMessage: forDemoPurposesOnlyText,
};

const meta = {
  title: 'Prototypes/Draft Email',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
  decorators: [
    (story) => {
      useEffect(() => {
        const { destroy: destroyDraftEmail } = runProposedInlineJS();
        const { destroy: destroyElasticTextArea } = createElasticTextArea(
          document.querySelector('.js-elastic-textarea'),
        );
        return () => {
          destroyDraftEmail();
          destroyElasticTextArea();
        };
      });
      return story();
    },
  ],
  render: (args) => prototypeDemo(args),
};

export default meta;

export const Demo = {
  args: prototypeData,
};
