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

When passed an error instance, the original error can be accessed via the 
`error.originalError` property.
