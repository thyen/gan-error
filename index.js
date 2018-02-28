const { STATUS_CODES } = require('statuses');
const { upperFirst, camelCase } = require('lodash');

class GanError extends Error {
  constructor(message) {
    let originalError;

    if (message instanceof Error) {
      message = undefined;
      originalError = message;
    }

    super(message);
    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(this.message).stack;
    }

    if (originalError) {
      this.originalError = originalError;
    }
  }
}

class HttpError extends GanError {
  constructor(message) {
    super(message);
    this.status = this.constructor.status;
  }
}

Object.entries(STATUS_CODES).forEach(([code, status]) => {
  code = parseInt(code);

  if (code < 400 || code >= 600) {
    return;
  }

  const name = upperFirst(camelCase(status)) + 'Error';
  const error = class extends HttpError {
    static get name() {
      return name;
    }

    static get status() {
      return code;
    }
  };

  GanError[code] = GanError[name] = error;
});

GanError.HttpError = HttpError;

module.exports = GanError;
