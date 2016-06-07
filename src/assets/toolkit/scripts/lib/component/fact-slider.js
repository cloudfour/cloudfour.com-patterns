'use strict';

export class FactSlider {
  constructor (element, {
    facts = element.querySelectorAll('.js-FunFact'),
    nextTrigger = element.querySelector('.js-FunFact-next'),
    prevTrigger = element.querySelector('.js-FunFact-prev'),
    currentCount = element.querySelector('.js-FunFact-current'),
    totalCount = element.querySelector('.js-FunFact-total'),
    className = 'is-visible'
  } = {}) {

    facts = Array.from(facts);
    let numFacts = facts.length;
    let counter = 0;
    totalCount.innerHTML = numFacts;

    Object.assign(this, {
      element,
      facts,
      numFacts,
      nextTrigger,
      prevTrigger,
      currentCount,
      totalCount,
      className,
      counter
    });

    this.attachEvents();
  }

  showCurrent () {
    // Get the index of the current item
    const factToShow = Math.abs(this.counter % this.numFacts);

    // Remove current class from all items
    this.facts.forEach(fact => {
      fact.classList.remove(this.className);
    });

    // Add current class to current item
    this.facts[factToShow].classList.add(this.className);

    // Update the navigation with the current slide number
    this.currentCount.innerHTML = factToShow + 1;
  }


  attachEvents () {

    this.nextTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter++;
      this.showCurrent();
    });

    this.prevTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter--;
      this.showCurrent();
    });
  }
}
