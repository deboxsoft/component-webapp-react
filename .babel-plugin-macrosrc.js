const macroConfig = process.env.NODE_ENV === 'production'
  ? {}
  : {};

module.exports = macroConfig;
