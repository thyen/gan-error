# @ganintegrity/gan-error

> an extendable ES6 [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
> with support for HTTP errors

## Installation

```bash
npm install --save @ganintegrity/gan-error
```

## Usage

```js
const GanError = require('@ganintegrity/gan-error');

const error = new GanError('something bad happened');

console.log(error.message); // => 'something bad happened'
console.log(error.name); // => 'GanError'

class MyError extends GanError {}

const myError = new MyError('some other bad thing happened');

console.log(myError.message); // => 'some other bad thing happened'
console.log(myError.name); // => 'MyError''
```

When passed an error instance, the `message` is "inherited" from the error
instance and the passed error stored as `originalError`:

```js
class CustomError extends GanError {}

const error = new CustomError(new Error('foo'));

console.log(error.message); // => 'foo'
console.log(error.originalError); // => new Error('foo')
```

Also, if the passed error instance has a `status` property, it will also be
copied over from the error:

```js
class CustomError extends GanError {}

const error = new CustomError(new GanError.InternalServerError('foo'));

console.log(error.message); // => 'foo'
console.log(error.status); // => 500
console.log(error.originalError); // => new GanError.InternalServerError('foo')
```

## HTTP errors

HTTP errors are exposed as static properties on `GanError` by name and by status
code:

```js
// base http error, without `status`
class MyError extends GanError.HttpError {}
// http error with `status` 500
class MySecondError extends GanError.InternalServerError {}
// same, http error with `status` 500
class MyOtherError extends GanError['500'] {}
```

### Disabling HTTP errors

If you're using this module for the browser and you don't need support for http
errors, you can disable them altogether by setting the `DISABLE_GAN_HTTP_ERRORS`
environment variable to `true` when bundling your frontend code (e.g. with
[webpack's DefinePlugin](https://webpack.js.org/plugins/define-plugin/)).
This reduces the size of the frontend bundle.
