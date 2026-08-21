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
const blockEmbedDemoArgTypes = {
  alignment: {
    options: {
      None: '',
      Left: 'alignleft',
      Center: 'aligncenter',
      Right: 'alignright',
      Full: 'alignfull',
      Wide: 'alignwide',
    },
    control: { type: 'select' },
  },
  ratio: {
    options: {
      '21:9': '21-9',
      '18:9': '18-9',
      '16:9': '16-9',
      '4:3': '4-3',
      '1:1': '1-1',
      '9:16': '9-16',
      '1:2': '1-2',
    },
    control: { type: 'select' },
  },
  caption: {
    control: { type: 'text' },
  },
};
const blockMediaTextDemoArgTypes = {
  alignment: {
    options: {
      None: '',
      Left: 'alignleft',
      Center: 'aligncenter',
      Right: 'alignright',
      Full: 'alignfull',
      Wide: 'alignwide',
    },
    control: { type: 'select' },
  },
  vertical_alignment: {
    options: {
      Top: 'top',
      Center: 'center',
      Bottom: 'bottom',
    },
    control: { type: 'select' },
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

export default {
  title: 'Vendor/WordPress/Core Blocks',
};

export const Audio = {
  render: () => `
    <figure class="wp-block-audio type">
      <audio controls="" src="/media/piano.ogg"></audio>
      <figcaption>My audio clip</figcaption>
    </figure>
  `,
};

export const Button = {
  render: () => `<div class="wp-block-button is-style-fill">
        <a class="wp-block-button__link" href="#">
          Single button
        </a>
      </div>`,
};

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

export const Code = {
  render: () => blockCodeDemo(),
};

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

export const Group = {
  argTypes: {
    background: {
      options: {
        None: '',
        Gray: 'has-gray-lighter-background-color has-background',
      },
      control: { type: 'select' },
    },
  },
  render: (args) => blockGroupDemo({ class: args.background }),
};

export const Image = {
  args: {
    alignment: '',
    style: 'is-style-default',
  },
  argTypes: {
    alignment: {
      options: {
        None: '',
        Left: 'alignleft',
        Center: 'aligncenter',
        Right: 'alignright',
        Full: 'alignfull',
        Wide: 'alignwide',
      },
      control: { type: 'select' },
    },
    style: {
      options: {
        None: 'is-style-default',
        Outlined: 'is-style-outlined',
      },
      control: { type: 'select' },
    },
  },
  render: (args) =>
    blockImageDemo({ alignment: args.alignment, style: args.style }),
};

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

export const Spacer = {
  render: () => `<p>Content before spacer.</p>
        <div
          style="height:50px"
          aria-hidden="true"
          class="wp-block-spacer"
        ></div>
      <p>Content after spacer.</p>`,
};

export const Table = {
  args: {
    show_header: true,
    show_footer: true,
    show_caption: true,
  },
  argTypes: {
    block_style: {
      options: ['', 'stripes', 'ruled', 'numeric'],
      type: { name: 'enum' },
      control: { type: 'select' },
    },
    column_alignment: {
      options: ['', 'center', 'right'],
      type: { name: 'enum' },
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

export const Verse = {
  render: () =>
    `<pre class="wp-block-verse">WHAT was he doing, the great god Pan,<br>    Down in the reeds by the river?<br>Spreading ruin and scattering ban,<br>Splashing and paddling with hoofs of a goat,<br>And breaking the golden lilies afloat<br>    With the dragon-fly on the river.</pre>`,
};
