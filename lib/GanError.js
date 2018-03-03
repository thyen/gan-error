class GanError extends Error {
  constructor(message) {
    let originalError;
    let data;

    if (message instanceof Error) {
      originalError = message;
      message = originalError.message;
    } else if (typeof message === 'object') {
      data = message;
      if (typeof data.message === 'string') {
        message = data.message;
      }
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
      if (!this.status && !!originalError.status) {
        this.status = originalError.status;
      }
    } else if (data) {
      Object.keys(data).forEach(key => {
        if (this[key] === undefined) {
          this[key] = data[key];
        }
      });
    }
  }
}

module.exports = GanError;
