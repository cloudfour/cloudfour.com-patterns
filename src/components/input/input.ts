export const elasticTextarea = (a: string) => {
  console.log('elastic textarea initialized', a);
};

console.log('LOADED!');

const elasticTextareas = document.querySelectorAll('.js-elastic-textarea');

console.log('ELEMENTS', elasticTextareas.length);

elasticTextareas.forEach(() => {
  console.log('FOR EACH');
  elasticTextarea('YO!');
});
