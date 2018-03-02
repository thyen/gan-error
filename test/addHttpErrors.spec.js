const expect = require('unexpected').clone();
const HttpError = require('../lib/HttpError');
const addHttpErrors = require('../lib/addHttpErrors');

describe('addHttpErrors', () => {
  const target = {};

  before(() => {
    addHttpErrors(target);
  });

  it('adds `HttpError` to the target', () => {
    expect(target.HttpError, 'to equal', HttpError);
  });

  it('adds http errors to the target by name', () => {
    expect(
      target.InternalServerError,
      'to equal',
      HttpError.InternalServerError
    );
  });

  it('adds http errors to the target by code', () => {
    expect(target['503'], 'to equal', HttpError.ServiceUnavailableError);
  });
});
