/** @import { ArgTypes, Meta, StoryObj } from '@storybook/html' */
import blockCodeDemo from './demo/code.twig';
import blockDetailsDemo from './demo/details.twig';
import blockEmbedSpeakerDeckDemo from './demo/embed/speakerdeck.twig';
import blockEmbedYouTubeDemo from './demo/embed/youtube.twig';
import blockGroupDemo from './demo/group.twig';
import blockImageDemo from './demo/image.twig';
import blockMediaTextDemo from './demo/media-text.twig';
import blockPullQuoteDemo from './demo/pullquote.twig';
import blockQuoteDemo from './demo/quote.twig';
import blockTableDemo from './demo/table.twig';
/** @type {Partial<ArgTypes>} */
const blockEmbedDemoArgTypes = {
  alignment: {
    options: [
      '',
      'alignleft',
      'aligncenter',
      'alignright',
      'alignfull',
      'alignwide',
    ],
    control: {
      type: 'select',
      labels: {
        '': 'None',
        alignleft: 'Left',
        aligncenter: 'Center',
        alignright: 'Right',
        alignfull: 'Full',
        alignwide: 'Wide',
      },
    },
  },
  ratio: {
    options: ['21-9', '18-9', '16-9', '4-3', '1-1', '9-16', '1-2'],
    control: {
      type: 'select',
      labels: {
        '21-9': '21:9',
        '18-9': '18:9',
        '16-9': '16:9',
        '4-3': '4:3',
        '1-1': '1:1',
        '9-16': '9:16',
        '1-2': '1:2',
      },
    },
  },
  caption: {
    control: { type: 'text' },
  },
};
/** @type {Partial<ArgTypes>} */
const blockMediaTextDemoArgTypes = {
  alignment: {
    options: [
      '',
      'alignleft',
      'aligncenter',
      'alignright',
      'alignfull',
      'alignwide',
    ],
    control: {
      type: 'select',
      labels: {
        '': 'None',
        alignleft: 'Left',
        aligncenter: 'Center',
        alignright: 'Right',
        alignfull: 'Full',
        alignwide: 'Wide',
      },
    },
  },
  vertical_alignment: {
    options: ['top', 'center', 'bottom'],
    control: {
      type: 'select',
      labels: {
        top: 'Top',
        center: 'Center',
        bottom: 'Bottom',
      },
    },
  },
  has_media_on_the_right: {
    control: { type: 'boolean' },
  },
  is_stacked_on_mobile: {
    control: { type: 'boolean' },
  },
  has_background: {
    control: { type: 'boolean' },
  },
  is_image_fill: {
    control: { type: 'boolean' },
  },
  media_width: {
    control: { type: 'range', min: 15, max: 85, step: 1 },
  },
};

/** @type {Meta} */
const meta = {
  title: 'Vendor/WordPress/Core Blocks',
};

export default meta;

/** @type {StoryObj} */
export const Audio = {
  render: () => `
    <figure class="wp-block-audio type">
      <audio controls="" src="/media/piano.ogg"></audio>
      <figcaption>My audio clip</figcaption>
    </figure>
  `,
};

/** @type {StoryObj} */
export const Button = {
  render: () => `<div class="wp-block-button is-style-fill">
        <a class="wp-block-button__link" href="#">
          Single button
        </a>
      </div>`,
};

/** @type {StoryObj} */
export const Buttons = {
  render: () => `<div class="wp-block-buttons">
        <div class="wp-block-button is-style-fill">
          <a class="wp-block-button__link" href="#">
            Button 1 (Default/Fill)
          </a>
        </div>
        <div class="wp-block-button is-style-outline">
          <a class="wp-block-button__link" href="#">
            Button 2 (Outline)
          </a>
        </div>
    </div>`,
};

/** @type {StoryObj} */
export const Code = {
  render: () => blockCodeDemo(),
};

/** @type {StoryObj} */
export const Columns = {
  render: () => `<div class="wp-block-columns">
        <div class="wp-block-column" style="flex-basis: 66.66%">
          <h2>Our Designers Code, Our Developers Design</h2>
          <p>
            Our sprint-based process works because we’re full of what our industry
            considers unicorns. Our designers write code. Our developers went to art
            school.
          </p>
          <p>
            We didn’t set out to become a unicorn safe haven, but we’re happy it
            happened. <a href="https://cloudfour.com/is">Our team</a>’s unique
            combination of skills is what enables us to do great work for our clients.
          </p>
        </div>
        <div class="wp-block-column" style="flex-basis: 33.33%">
          <figure class="wp-block-image size-full">
            <img
              src="https://cloudfour.com/wp-content/uploads/2016/07/approach-unicorn.svg"
              alt=""
            />
          </figure>
        </div>
      </div>`,
};

/** @type {StoryObj} */
export const Cover = {
  render: () => `<div
        class="wp-block-cover has-background-dim-40 has-background-dim has-parallax"
        style="background-image:url(/media/Windbuchencom.jpg);background-color:#065174"
      >
        <div class="wp-block-cover__inner-container">
          <p style="font-size:48px" class="has-text-align-center">
            <strong>Snow Patrol</strong>
          </p>
        </div>
      </div>`,
};

/** @type {StoryObj} */
export const CoverVideo = {
  name: 'Cover (Video)',
  render: () => `<div class="wp-block-cover has-background-dim">
        <div class="vsc-controller" data-vscid="y4nfjhbvo">
        </div>
        <video
          class="wp-block-cover__video-background"
          autoplay
          muted
          data-origwidth="1920"
          data-origheight="1080"
          src="/media/waterfall_edit.mp4"
          style="width: 100%;"
          data-vscid="y4nfjhbvo"
          type="video/mp4">
        </video>
        <div class="wp-block-cover__inner-container">
          <p class="has-text-align-center has-large-font-size">Waterfall</p></p>
        </div>
      </div>`,
};

/** @type {StoryObj} */
export const Details = {
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    background_color: {
      control: { type: 'text' },
    },
  },
  parameters: { layout: 'fullscreen' },
  render: (args) => blockDetailsDemo(args),
};

/** @type {StoryObj} */
export const EmbedYouTube = {
  name: 'Embed (YouTube)',
  args: {
    alignment: '',
    ratio: '16-9',
    caption:
      'Jason Grigsby’s talk, “Imagining a Fluid Future for Design Tools”',
  },
  argTypes: blockEmbedDemoArgTypes,
  parameters: { layout: 'fullscreen' },
  render: (args) => blockEmbedYouTubeDemo(args),
};

/** @type {StoryObj} */
export const EmbedSpeakerDeck = {
  name: 'Embed (Speaker Deck)',
  args: {
    alignment: '',
    ratio: '16-9',
    caption:
      'Slides for Jason Grigsby’s talk, “Imagining a Fluid Future for Design Tools”',
  },
  argTypes: blockEmbedDemoArgTypes,
  parameters: { layout: 'fullscreen' },
  render: (args) => blockEmbedSpeakerDeckDemo(args),
};

/** @type {StoryObj} */
export const File = {
  render: () => `<div class="wp-block-file">
        <a href="#" class="wp-block-file__button" download="">
          Primary file download button
        </a>
      </div>
      <div class="wp-block-file">
        <a href="#">
          Primary file download link
        </a>
      </div>
      <div class="wp-block-file c-button--secondary">
        <a href="#" class="wp-block-file__button" download="">
          Secondary file download button
        </a>
      </div>
      <div class="wp-block-file c-button--secondary">
        <a href="">Secondary file download link</a>
      </div>
      <div class="wp-block-file c-button--tertiary">
        <a href="#" class="wp-block-file__button" download="">Tertiary file download button</a>
      </div>
      <div class="wp-block-file c-button--tertiary">
        <a href="#">Tertiary file download link</a>
      </div>`,
};

/** @type {StoryObj} */
export const Gallery = {
  render: () => `<figure class="wp-block-gallery columns-2 is-cropped">
        <ul class="blocks-gallery-grid">
          <li class="blocks-gallery-item">
            <figure>
              <a href="/media/Glacial_lakes_Bhutan.jpg">
                <img src="/media/Glacial_lakes_Bhutan.jpg" />
              </a>
            </figure>
          </li>
          <li class="blocks-gallery-item">
            <figure>
              <a href="https://wp-themes.com/twentytwenty/?page_id=2">
                <img src="/media/Sediment_off_the_Yucatan_Peninsula.jpg" />
              </a>
            </figure>
          </li>
          <li class="blocks-gallery-item">
            <figure>
              <img src="/media/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg" />
            </figure>
          </li>
          <li class="blocks-gallery-item">
            <figure>
              <img src="/media/Windbuchencom.jpg" />
            </figure>
          </li>
        </ul>
        <figcaption class="blocks-gallery-caption">A gallery caption</figcaption>
      </figure>`,
};

/** @type {StoryObj} */
export const Group = {
  argTypes: {
    background: {
      options: ['', 'has-gray-lighter-background-color has-background'],
      control: {
        type: 'select',
        labels: {
          '': 'None',
          'has-gray-lighter-background-color has-background': 'Gray',
        },
      },
    },
  },
  render: (args) => blockGroupDemo({ class: args.background }),
};

/** @type {StoryObj} */
export const Image = {
  args: {
    alignment: '',
    style: 'is-style-default',
  },
  argTypes: {
    alignment: {
      options: [
        '',
        'alignleft',
        'aligncenter',
        'alignright',
        'alignfull',
        'alignwide',
      ],
      control: {
        type: 'select',
        labels: {
          '': 'None',
          alignleft: 'Left',
          aligncenter: 'Center',
          alignright: 'Right',
          alignfull: 'Full',
          alignwide: 'Wide',
        },
      },
    },
    style: {
      options: ['is-style-default', 'is-style-outlined'],
      control: {
        type: 'select',
        labels: {
          'is-style-default': 'None',
          'is-style-outlined': 'Outlined',
        },
      },
    },
  },
  render: (args) =>
    blockImageDemo({ alignment: args.alignment, style: args.style }),
};

/** @type {StoryObj} */
export const MediaText = {
  name: 'Media-Text',
  args: {
    is_stacked_on_mobile: true,
    media_width: 33,
  },
  argTypes: blockMediaTextDemoArgTypes,
  parameters: { layout: 'fullscreen' },
  render: (args) => blockMediaTextDemo(args),
};

/** @type {StoryObj} */
export const Preformatted = {
  render: () => String.raw`<pre class="wp-block-preformatted">
       ___________________________
     < I'm an expert in my field. >
       ---------------------------
           \  ^__^
            \ (oo)\_______
              (__)\       )\/\
                  ||----w |
                  ||     ||
      </pre>`,
};

/** @type {StoryObj} */
export const Quote = {
  args: {
    show_citation: true,
    has_background: false,
  },
  argTypes: {
    show_citation: {
      control: { type: 'boolean' },
    },
    style: {
      options: ['default', 'plain'],
      control: { type: 'select' },
    },
    has_background: {
      control: { type: 'boolean' },
    },
    text_align: {
      options: ['left', 'center', 'right'],
      control: { type: 'select' },
    },
  },
  render: (args) => blockQuoteDemo(args),
};

/** @type {StoryObj} */
export const Pullquote = {
  args: {
    show_citation: true,
  },
  argTypes: {
    show_citation: {
      control: { type: 'boolean' },
    },
    align: {
      options: ['left', 'right', 'wide', 'full'],
      control: { type: 'select' },
    },
    text_align: {
      options: ['left', 'center', 'right'],
      control: { type: 'select' },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => blockPullQuoteDemo(args),
};

/** @type {StoryObj} */
export const Separator = {
  args: { style: 'default' },
  argTypes: {
    style: {
      options: ['default', 'wide', 'dots'],
      control: {
        type: 'select',
      },
    },
  },
  render: (args) => `<hr class="wp-block-separator is-style-${args.style}">`,
};

/** @type {StoryObj} */
export const Spacer = {
  render: () => `<p>Content before spacer.</p>
        <div
          style="height:50px"
          aria-hidden="true"
          class="wp-block-spacer"
        ></div>
      <p>Content after spacer.</p>`,
};

/** @type {StoryObj} */
export const Table = {
  args: {
    show_header: true,
    show_footer: true,
    show_caption: true,
  },
  argTypes: {
    block_style: {
      options: ['', 'stripes', 'ruled', 'numeric'],
      type: { name: 'enum', value: ['', 'stripes', 'ruled', 'numeric'] },
      control: { type: 'select' },
    },
    column_alignment: {
      options: ['', 'center', 'right'],
      type: { name: 'enum', value: ['', 'center', 'right'] },
      control: { type: 'select' },
    },
    fixed_layout: {
      type: { name: 'boolean' },
    },
    show_header: {
      type: { name: 'boolean' },
    },
    show_footer: {
      type: { name: 'boolean' },
    },
    show_caption: {
      type: { name: 'boolean' },
    },
  },
  render: (args) => blockTableDemo(args),
};

/** @type {StoryObj} */
export const Verse = {
  render: () =>
    `<pre class="wp-block-verse">WHAT was he doing, the great god Pan,<br>    Down in the reeds by the river?<br>Spreading ruin and scattering ban,<br>Splashing and paddling with hoofs of a goat,<br>And breaking the golden lilies afloat<br>    With the dragon-fly on the river.</pre>`,
};
