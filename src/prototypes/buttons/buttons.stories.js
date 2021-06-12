import toggleIconsPrototype from './toggle-icons.twig';
import './toggle-icons.scss';

export default {
  title: 'Prototypes/Buttons',
  parameters: {
    docs: { page: null },
  },
};

export const ToggleIcons = () => toggleIconsPrototype({});
