// Here's the dumb little add eventlister fucniton
export const createElasticTextarea = (element: Element) => {
  // TODO: add event listener running update command inline
  console.log('elastic textarea initialized', element);

  // Return an object with the destroy method
  // so users can remove the event listener if needed
  return {
    destroy() {
      // TODO: remove event listener
      console.log('DESTROY', element);
    },
  };
};
