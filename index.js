const GanError = require('./lib/GanError');

if (!process.env.DISABLE_GAN_HTTP_ERRORS) {
  require('./lib/addHttpErrors')(GanError);
}

module.exports = GanError;
