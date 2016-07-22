'use strict';

export class Slideshow {
  constructor (element, {
    slideHolder = element.querySelector('.js-Slideshow-slides'),
    slides = element.querySelectorAll('.js-Slideshow-slide'),
    nextTrigger = element.querySelector('.js-Slideshow-next'),
    prevTrigger = element.querySelector('.js-Slideshow-prev'),
    currentCount = element.querySelector('.js-Slideshow-current'),
    totalCount = element.querySelector('.js-Slideshow-total'),
    classForward = 'slide-forward',
    classForwardReset = 'slide-forwardReset',
    classBack = 'slide-back'
  } = {}) {

    this.slides = Array.from(slides);
    this.numSlides = this.slides.length;
    this.counter = 0;
    totalCount.innerHTML = this.numSlides;

    Object.assign(this, {
      element,
      slideHolder,
      nextTrigger,
      prevTrigger,
      currentCount,
      totalCount,
      classForward,
      classForwardReset,
      classBack
    });

    this.attachEvents();
  }

  updateCurrent () {
    if (this.counter > 0) {
      var currentSlide = (this.counter % this.numSlides);
    } else {
      var currentSlide = (this.counter % this.numSlides) ? ((this.counter % this.numSlides) + this.numSlides) : 0;
    }

    // Update the navigation with the current slide number
    this.currentCount.innerHTML = currentSlide + 1;
  }

  getCurrentPosition (el) {
    const transformMatrix = getComputedStyle(el).transform;
    const slideHolderWidth = el.offsetWidth;
    var matrixValues = transformMatrix.split('(')[1],
    matrixValues = matrixValues.split(')')[0],
    matrixValues = matrixValues.split(',');
    const translateX = matrixValues[4];
    const currentPosition = this.convertToPercent(translateX, slideHolderWidth);
    return currentPosition;
  }

  convertToPercent(el, base) {
    const percent = (el / base) * 100;
    return percent;
  }

  findKeyframesRule(rule) {
    var ss = document.styleSheets;
    console.log(ss);
    for (var j = 0; j < ss[1].cssRules.length; ++j) {
      if (ss[1].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE &&
      ss[1].cssRules[j].name == rule) {
        return ss[1].cssRules[j]; }
    }
    return null;
  }

  slide(direction) {

    // Remove previously applied directional class
    this.slideHolder.classList.remove(this.classForward, this.classBack);

    // Add new directional class to slide container
    if (direction == -1) {
      this.slideHolder.classList.add(this.classForward);
    } else {
      this.slideHolder.classList.add(this.classBack);
    }

    // Reset the position when going forward
    if (((this.counter % this.numSlides) == 0) && (direction == -1)) {
      var currentPosition = 100;
      this.slideHolder.classList.add(this.classForwardReset);
    }
    // Reset the position when going back
    else if ((
      // counter > 0
      ((this.counter % this.numSlides) == (this.numSlides - 1)) ||
      // counter < 0
      ((this.counter % this.numSlides) == -1)) &&
      // Going back
      (direction == 1)) {
      var currentPosition = -(this.numSlides * 100);
    } else {
      var currentPosition = this.getCurrentPosition(this.slideHolder);
    }

    var increment = direction * 100;

    const newPosition = Number(currentPosition) + Number(increment);

    this.slideHolder.style.transform = 'translateX(' + newPosition + '%)';

    console.log('Counter: ' + this.counter);
    console.log('Number of slides: ' + this.numSlides);
    console.log('Old position: ' + currentPosition);
    console.log('Direction: ' + direction);
    console.log('Increment: ' + increment);
    console.log('New position: ' + newPosition);
    console.log('END' + '\n\n');
  }

  attachEvents () {
    this.nextTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter++;
      this.updateCurrent();
      this.slide(-1);
    });

    this.prevTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter--;
      this.updateCurrent();
      this.slide(1);
    });
  }
}
