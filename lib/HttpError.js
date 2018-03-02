const { STATUS_CODES } = require('statuses');
const { upperFirst, camelCase } = require('lodash');
const GanError = require('./GanError');

class HttpError extends GanError {}

Object.entries(STATUS_CODES).forEach(([code, statusString]) => {
  code = parseInt(code);

  if (code < 400 || code >= 600) {
    return;
  }

  let name = upperFirst(camelCase(statusString));
  if (!name.endsWith('Error')) {
    name += 'Error';
  }

  const error = class extends HttpError {
    static get name() {
      return name;
    }
  };

  error.status = code;
  error.prototype.status = code;

  HttpError[code] = HttpError[name] = error;
});

module.exports = HttpError;
