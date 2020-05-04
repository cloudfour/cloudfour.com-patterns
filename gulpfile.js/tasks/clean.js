const { outDir } = require('../helpers');

const del = require('eliminate');

const clean = async () => {
  try {
    await del(outDir);
  } catch (error) {
    // Nothing to delete
  }
};

module.exports = clean;
