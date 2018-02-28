# @ganintegrity/gan-error

> an extendable `Error`

## Installation

```bash
npm install --save @ganintegrity/gan-error
```

## Usage

```js
const GanError = require('@ganintegrity/gan-error');
class MyError extends GanError {}

const error = new MyError('something bad happened');
const withErrorInstance = new MyError(error);
```

When passed an error instance, the `message` is "inherited" from the error 
instance. Also, if the passed error instance is a `GanError.HttpError` instance, 
the `status` will also be inherited from that instance (if the error being 
created is not a `GanError.HttpError` instance). The passed error instance can 
be accessed via the `error.originalError` property.

## HTTP errors

```js
// base http error, without `status`
class MyError extends GanError.HttpError {}
// http error with `status` 500
class MySecondError extends GanError.InternalServerError {}
// same, http error with `status` 500
class MyOtherError extends GanError['500'] {}
```
