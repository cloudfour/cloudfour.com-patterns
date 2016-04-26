'use strict';

import 'prismjs';

class DrizzleDom {
  constructor () {
    // Nav toggle
    this.navToggle.addEventListener('click', event => {
      event.preventDefault();
      this.toggleNav();
    });
  }

  get frameContainers () {
    return Array.from(
      document.querySelectorAll('[data-drizzle-append-iframe]')
    );
  }

  get nav () {
    return document.getElementById('nav');
  }

  get navMenu () {
    return document.getElementById('nav-menu');
  }

  get navToggle () {
    return this.nav.querySelector('a[href="#nav"]');
  }

  get navLinks () {
    return Array.from(
      this.navMenu.querySelectorAll('a')
    );
  }

  toggleNav () {
    this.nav.classList.toggle('is-active');
  }

  setActiveNavItem (pathname) {
    const noIndex = str => str.replace(/\/(index\.html)?$/, '');
    const isMatch = a => noIndex(a.pathname) === noIndex(pathname);
    const item = this.navLinks.find(isMatch);
    if (item) {
      item.classList.add('is-active');
    }
  }
}

const drizzleDom = new DrizzleDom();

// Mark the active menu item
drizzleDom.setActiveNavItem(window.location.pathname);

// Initialize the iframe previews
if (drizzleDom.frameContainers.length) {
  window.addEventListener('load', () => {
    drizzleDom.frameContainers.forEach(container => {
      const src = container.getAttribute('data-drizzle-append-iframe');
      const iframe = document.createElement('iframe');
      iframe.addEventListener('load', () => {
        container.classList.add('is-loaded');
      });
      iframe.setAttribute('src', src);
      container.appendChild(iframe);
    });
  });
}
