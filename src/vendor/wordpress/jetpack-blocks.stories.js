import contactFormDemo from './demo/contact-form/form.twig';
import contactFormSuccessDemo from './demo/contact-form/success.twig';

export default {
  title: 'Vendor/WordPress/Jetpack Blocks',
};

export const Markdown = {
  render: () => `<div class="wp-block-jetpack-markdown">
      <p>
        <b>Lorem</b> <i>ipsum</i> dolor sit amet, consectetur adipiscing elit. Quisque eu ex
        enim. Nunc efficitur scelerisque dolor et sollicitudin.
      </p>
      <p>
        Donec finibus lorem elit, eu consectetur quam pellentesque sed.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas.
      </p>
    </div>`,
};

export const ContactForm = {
  name: 'Contact Form',
  parameters: { layout: 'fullscreen' },
  render: contactFormDemo,
};

export const ContactFormSuccess = {
  name: 'Contact Form Success',
  parameters: { layout: 'fullscreen' },
  render: contactFormSuccessDemo,
};
