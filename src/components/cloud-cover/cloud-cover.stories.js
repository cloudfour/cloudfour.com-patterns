import { useEffect } from 'storybook/preview-api';

import contentDemo from './demo/content.twig';
import extraDemo from './demo/extra.twig';
import flagImage from './demo/flag.svg';
import robotImage from './demo/robot.svg';
import sceneDemo from './demo/scene.twig';

export default {
  title: 'Components/Cloud Cover',
  parameters: {
    docs: { story: { inline: false } },
    layout: 'fullscreen',
    themes: { disable: true },
  },
};

export const Content = {
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/components/cloud-cover/cloud-cover.twig' %}
  {% block heading %}
    {% include '@cloudfour/components/heading/heading.twig' with {
      level: -2,
      content: 'Our Team'
    } only %}
  {% endblock %}
  {% block content %}
    <p>
      We are a small, versatile team who care passionately about the web.
      We’re full of what our industry considers unicorns. Our designers
      code. Our developers went to art school.
    </p>
  {% endblock %}
{% endembed %}`,
      },
    },
  },
  render: () => contentDemo(),
};

export const Scene = {
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/components/cloud-cover/cloud-cover.twig' %}
  {% block heading %}
    {% include '@cloudfour/components/heading/heading.twig' with {
      level: -2,
      content: 'What We Do'
    } only %}
  {% endblock %}
  {% block content %}
    <p>
      We
      {% include '@cloudfour/components/icon/icon.twig' with {
        name: 'heart',
        inline: true
      } only %}
      <span class="u-hidden-visually">love</span>
      solving tough puzzles through design and&nbsp;code.
    </p>
  {% endblock %}
  {% block scene %}
    <img class="c-cloud-cover__scene-object" src="./path/robot.svg" alt="">
  {% endblock %}
{% endembed %}`,
      },
    },
  },
  render: () => sceneDemo({ image: robotImage }),
};

export const HorizonScene = {
  name: 'Horizon Scene',
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/components/cloud-cover/cloud-cover.twig' %}
  {% block heading %}
    {% include '@cloudfour/components/heading/heading.twig' with {
      level: -2,
      content: 'What We Do'
    } only %}
  {% endblock %}
  {% block content %}
    <p>
      We
      {% include '@cloudfour/components/icon/icon.twig' with {
        name: 'heart',
        inline: true
      } only %}
      <span class="u-hidden-visually">love</span>
      solving tough puzzles through design and&nbsp;code.
    </p>
  {% endblock %}
  {% block scene %}
    <img class="c-cloud-cover__scene-object" src="./path/flag.svg" alt="">
  {% endblock %}
{% endembed %}`,
      },
    },
  },
  render: () =>
    sceneDemo({
      class: 'c-cloud-cover--horizon-scene',
      image: flagImage,
    }),
};

export const ExtraContent = {
  name: 'Extra Content',
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/components/cloud-cover/cloud-cover.twig' %}
  {% block heading %}
    {% include '@cloudfour/components/heading/heading.twig' with {
      level: -2,
      content: 'What We Do'
    } only %}
  {% endblock %}
  {% block content %}
    <p>
      We
      {% include '@cloudfour/components/icon/icon.twig' with {
        name: 'heart',
        inline: true
      } only %}
      <span class="u-hidden-visually">love</span>
      solving tough puzzles through design and&nbsp;code.
    </p>
  {% endblock %}
  {% block extra %}
    <p>(Imagine a nifty newsletter signup form here 👀)</p>
  {% endblock %}
{% endembed %}`,
      },
    },
  },
  render: () => extraDemo(),
};

export const FullHeight = {
  name: 'Full Height',
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/components/cloud-cover/cloud-cover.twig' %}
  {% block heading %}
    {% include '@cloudfour/components/heading/heading.twig' with {
      level: -2,
      content: 'What We Do'
    } only %}
  {% endblock %}
  {% block content %}
    <p>
      We
      {% include '@cloudfour/components/icon/icon.twig' with {
        name: 'heart',
        inline: true
      } only %}
      <span class="u-hidden-visually">love</span>
      solving tough puzzles through design and&nbsp;code.
    </p>
  {% endblock %}
  {% block scene %}
    <img class="c-cloud-cover__scene-object" src="./path/robot.svg" alt="">
  {% endblock %}
{% endembed %}`,
      },
    },
  },
  render: () => {
    useEffect(() => {
      // Set this story's `body` element to full-height
      document.body.style.height = '100%';
      // Prevent Storybook's container from affecting this layout
      document.querySelector('#storybook-root').style.display = 'contents';
    });
    return sceneDemo({
      class: 'c-cloud-cover--full-height',
      image: robotImage,
    });
  },
};
