const addHttpErrors = target => {
  const HttpError = require('./HttpError');

  Object.keys(HttpError).forEach(key => {
    if (!parseInt(key)) {
      return;
    }
    const error = HttpError[key];
    target[error.name] = target[key] = error;
  });

  target.HttpError = HttpError;
};

module.exports = addHttpErrors;
