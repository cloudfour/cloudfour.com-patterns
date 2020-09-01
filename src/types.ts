declare module '*.twig' {
  function template(opts: Record<string, unknown>): string;
  export default template;
}
