const sharedConfig = require('./snowpack.config.shared');
const prod = process.env.NODE_ENV === 'production';
module.exports = {
  ...sharedConfig,
  optimize: {
    bundle: prod,
    minify: prod,
  },
  buildOptions: {
    watch: !prod,
    out: './build',
    /* ... */
  },
};
