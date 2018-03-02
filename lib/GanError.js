class GanError extends Error {
  constructor(message) {
    let originalError;

    if (message instanceof Error) {
      originalError = message;
      message = originalError.message;
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

      if (
        !(this instanceof GanError.HttpError) &&
        originalError instanceof GanError.HttpError &&
        originalError.status
      ) {
        this.status = originalError.status;
      }
    }
  }
}

module.exports = GanError;
