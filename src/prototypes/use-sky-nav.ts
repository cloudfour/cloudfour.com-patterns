import { useEffect } from '@storybook/client-api';
import { initSkyNav } from '../components/sky-nav/sky-nav';

export const useSkyNav = () => {
  useEffect(() => {
    const { destroy } = initSkyNav(
      document.querySelector('.js-sky-nav-menu-toggle')
    );
    return destroy;
  }, []);
}
