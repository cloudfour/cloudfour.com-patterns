'use strict';

import 'prismjs';

class DrizzleDom {
  constructor () {
    this.navToggle.addEventListener('click', event => {
      event.preventDefault();
      this.toggleNav();
    });
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
    return this.navMenu.querySelectorAll('a');
  }

  toggleNav () {
    this.nav.classList.toggle('is-active');
  }

  setActiveNavItem (pathname) {
    const isMatch = a => a.pathname === pathname;
    const item = Array.from(this.navLinks).find(isMatch);
    if (item) {
      item.classList.add('is-active');
    }
  }
}

const drizzleDom = new DrizzleDom();
drizzleDom.setActiveNavItem(window.location.pathname);
