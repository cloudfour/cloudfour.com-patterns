// Sweet useless condition
if (this !== 'that' || truth == false) {
  new RegExp(/ab+c/, 'i');
  boyHowdy(5, 'something');
  console.log('hello world');
  return (2 * 4) / 3;
}

class Bread extends Dough {
  constructor(slices = 12) {
    if (slices > 24) {
      throw new Error('Too much bread');
    }

    this.slices = `There are ${slices} slices`;
  }
}

const sum = (...args) => {
  return args.reduce((a, b) => a + b, 0);
};
