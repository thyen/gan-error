const expect = require('unexpected').clone();
const GanError = require('../lib/GanError');
const HttpError = require('../lib/HttpError');

describe('HttpError', () => {
  it('extends `Error`', () => {
    expect(HttpError.prototype, 'to be a', GanError);
  });

  it('exposes http errors as static properties by name', () => {
    expect(HttpError.BandwidthLimitExceededError, 'to be defined');
    expect(
      HttpError.BandwidthLimitExceededError.name,
      'to be',
      'BandwidthLimitExceededError'
    );
    expect(HttpError.BandwidthLimitExceededError.status, 'to be', 509);
  });

  it('exposes http errors as static properties by code', () => {
    expect(HttpError['429'], 'to be defined');
    expect(HttpError['429'].name, 'to be', 'TooManyRequestsError');
    expect(HttpError['429'].status, 'to be', 429);
  });

  it('does not duplicate "Error" for http errors with "Error" already', () => {
    expect(HttpError.InternalServerErrorError, 'to be undefined');
    expect(HttpError.InternalServerError, 'to be defined');
  });

  describe('when instances are created', () => {
    it('sets the error status for http errors', () => {
      expect(new HttpError.MethodNotAllowedError().status, 'to be', 405);
    });

    it('does not set a status for `HttpError` itself', () => {
      expect(new HttpError().status, 'to be undefined');
    });
  });
});
