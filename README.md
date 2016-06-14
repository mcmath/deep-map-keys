# deep-map-keys

[![Version][version-badge]][npm]
[![License][license-badge]][license]
[![Build][build-badge]][travis]
[![Coverage][coverage-badge]][coveralls]
[![Dependencies][dependencies-badge]][gemnasium]

Recurses through a JSON-like object and transforms its keys, returning a new object.

## Install

Install via [npm][npm].

```sh
npm install --save deep-map-keys
```

## Usage

Suppose we want to change the keys of an object from [snake case][snake-case] to
[camel case][camel-case]. We can do something like this:

```js
const deepMapKeys = require('deep-map-keys');

let comment = {
  comment_id: 42,
  user_id: 1024,
  user_name: 'Mufasa',
  content: 'You deliberately disobeyed me.',
  viewed_by: [
    { user_id: 3820, user_name: 'Zazu' },
    { user_id: 8391, user_name: 'Rafiki' }
  ]
};

let result = deepMapKeys(comment, key => {
  return key.replace(/_(\w)/g, (match, char) => char.toUpperCase());
});

console.log(result); /*
{
  commentId: 42,
  userId: 1024,
  userName: 'Mufasa',
  content: 'You deliberately disobeyed me.',
  viewedBy: [
    { userId: 3820, userName: 'Rafiki' },
    { userId: 8391, userName: 'Zazu' }
  ]
};
*/
```

## API

### `deepMapKeys(object, transformFn, [options])`

Applies `transformFn` to each key in an object. Keys are visited recursively,
so nested keys will be transformed. A new object is always returned; the
original object is unmodified.

##### object

`object`

The object whose keys are to be transformed. This object may be an `Array`.

##### transformFn

`function`

The function to call for each key. The return value of the function
determines the transformed value. The function is called with a single
argument:

* **key**: The key being transformed.

##### options

`object` (optional)

An options object. The following options are accepted:

* **thisArg**: Sets the value of `this` within `transformFn`.

#### Returns

`object`

Returns a new object.

## License

Copyright &copy; 2016 Akim McMath. Licensed under the [MIT License][license].

[version-badge]: https://img.shields.io/npm/v/deep-map-keys.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/deep-map-keys.svg?style=flat-square
[build-badge]: https://img.shields.io/travis/akim-mcmath/deep-map-keys/master.svg?style=flat-square
[coverage-badge]: https://img.shields.io/coveralls/akim-mcmath/deep-map-keys/master.svg?style=flat-square&service=github
[dependencies-badge]: https://img.shields.io/gemnasium/akim-mcmath/deep-map-keys.svg?style=flat-square
[npm]: https://www.npmjs.com/package/deep-map-keys
[license]: LICENSE
[travis]: https://travis-ci.org/akim-mcmath/deep-map-keys
[coveralls]: https://coveralls.io/github/akim-mcmath/deep-map-keys?branch=master
[gemnasium]: https://gemnasium.com/akim-mcmath/deep-map-keys
[snake-case]: https://en.wikipedia.org/wiki/Snake_case
[camel-case]: https://en.wikipedia.org/wiki/CamelCase
