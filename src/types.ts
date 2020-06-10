declare module '*.twig' {
  function template(opts: Record<string, unknown>): string;
  export default template;
}

declare module '*.yml' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokens: Record<string, any>;
  export = tokens;
}
