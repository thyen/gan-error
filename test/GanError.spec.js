const expect = require('unexpected').clone();
const GanError = require('../lib/GanError');
const { BadRequestError } = require('../lib/HttpError');

describe('GanError', () => {
  it('extends `Error`', () => {
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

      it('inherits the status from the error if it has one', () => {
        const error = new BadRequestError('foo');
        expect(new GanError(error).status, 'to be', 400);
      });

      it('stores the error as `originalError`', () => {
        const error = new Error('foo');
        expect(new GanError(error).originalError, 'to equal', error);
      });
    });

    describe('when passed an object', () => {
      it('uses the message from the object if there is one', () => {
        expect(new GanError({ message: 'foo' }).message, 'to be', 'foo');
      });

      it('assigns all other items in the object to the error', () => {
        expect(
          new GanError({ message: 'foo', foo: 'foo', bar: {} }),
          'to satisfy',
          { message: 'foo', foo: 'foo', bar: {} }
        );
      });

      it('does not overwrite already-set prototype keys with the object keys', () => {
        expect(new BadRequestError({ status: 500 }).status, 'to be', 400);
      });
    });
  });
});
