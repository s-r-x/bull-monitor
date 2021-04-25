const sharedConfig = require('./snowpack.config.shared');
module.exports = {
  ...sharedConfig,
  optimize: {
    bundle: true,
    minify: true,
  },
  buildOptions: {
    out: '../../demo',
  },
};
