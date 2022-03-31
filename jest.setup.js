import { configureDefaults } from 'pleasantest';

configureDefaults({
  // Design intent doesn't require Level AAA conformance,
  // but we want to keep a baseline targetSize check
  user: { targetSize: 35 /* px */ },
});
