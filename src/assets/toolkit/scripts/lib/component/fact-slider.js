'use strict';

export class FactSlider {
  constructor (element, {
    facts = element.querySelectorAll('.FunFact'),
    factNavNext = element.querySelector('.js-FunFact-next'),
    factNavPrev = element.querySelector('.js-FunFact-prev'),
    factNavCurrent = element.querySelector('.js-FunFact-current'),
    factNavTotal = element.querySelector('.js-FunFact-total'),
    className = 'is-visible'
  } = {}) {

    facts = Array.from(facts);
    let numFacts = facts.length;
    let counter = 0;
    factNavTotal.innerHTML = numFacts;

    Object.assign(this, {
      element,
      facts,
      numFacts,
      factNavNext,
      factNavPrev,
      factNavCurrent,
      factNavTotal,
      className,
      counter
    });

    this.navigate();
  }

  showCurrent () {
    // Get the index of the current item
    let factToShow = Math.abs(this.counter % this.numFacts);
    console.log (factToShow);

    // Remove current class from all items
    this.facts.forEach(fact=> {
      fact.classList.remove(this.className);
    });

    // Add current class to current item
    this.facts[factToShow].classList.add(this.className);

    // Update the navigation with the current slide number
    this.factNavCurrent.innerHTML = factToShow + 1;
  }


  navigate () {

    this.factNavNext.addEventListener('click', event => {
      event.preventDefault();
      this.counter++;
      this.showCurrent();
    });

    this.factNavPrev.addEventListener('click', event => {
      event.preventDefault();
      this.counter--;
      this.showCurrent();
    });
  }
}
