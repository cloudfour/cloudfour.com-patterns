'use strict';

export function extend (subject, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    if (!sources[i]) {
      continue;
    }
    for (var key in sources[i]) {
      if (sources[i].hasOwnProperty(key)) {
        subject[key] = sources[i][key];
      }
    }
  }
  return subject;
}
