const expect = require('unexpected').clone();
const GanError = require('../lib/GanError');
const HttpError = require('../lib/HttpError');

describe('GanError', () => {
  it('extends Error', () => {
    expect(GanError.prototype, 'to be an', Error);
  });

  describe('when instances are created', () => {
    it('sets the error name to `GanError`', () => {
      expect(new GanError().name, 'to be', 'GanError');
    });

    it('supports passing a message like regular `Error`s', () => {
      expect(new GanError('foo').message, 'to be', 'foo');
    });

    it('captures the stack trace', () => {
      expect(new GanError().stack, 'to be a string');
    });

    it('exposes `HttpError` as `GanError.HttpError`', () => {
      expect(GanError.HttpError, 'to equal', HttpError);
    });

    it('exposes `HttpError`s as `GanError` statics', () => {
      expect(
        HttpError.InternalServerError,
        'to equal',
        GanError.InternalServerError
      );
      expect(HttpError['418'], 'to equal', GanError.ImATeapotError);
    });

    describe('without `Error.captureStackTrace`', () => {
      let captureStackTrace;

      before(() => {
        captureStackTrace = Error.captureStackTrace;
        Error.captureStackTrace = undefined;
      });

      after(() => {
        Error.captureStackTrace = captureStackTrace;
      });

      it('captures a stack trace', () => {
        expect(new GanError().stack, 'to be a string');
      });
    });

    describe('when passed an error instance', () => {
      it('inherits the error message from the error', () => {
        expect(new GanError(new Error('foo')).message, 'to be', 'foo');
      });

      it('stores the error as `originalError`', () => {
        const error = new Error('foo');
        expect(new GanError(error).originalError, 'to equal', error);
      });
    });

    describe('when passed a `HttpError` instance', () => {
      it('inherits the error message from the error', () => {
        expect(new GanError(new HttpError('foo')).message, 'to be', 'foo');
      });

      it('inherits the status from the error', () => {
        const error = new HttpError.BadRequestError('foo');
        expect(new GanError(error).status, 'to be', 400);
      });

      it('does non inherit an `undefined` status', () => {
        const error = new GanError(new HttpError('foo'));
        expect(error.status, 'to be undefined');
        expect(Object.keys(error), 'not to contain', 'status');
      });

      it('stores the error as `originalError`', () => {
        const error = new Error('foo');
        expect(new GanError(error).originalError, 'to equal', error);
      });
    });
  });
});
