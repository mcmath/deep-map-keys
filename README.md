# Deep Map Keys

[![Version][version-badge]][npm]
[![License][license-badge]][license]
[![Build][build-badge]][travis]
[![Coverage][coverage-badge]][coveralls]
[![Dependencies][dependencies-badge]][gemnasium]

[Install](#install) | [Usage](#usage) | [API](#api) | [TypeScript](#typescript) | [License](#license)

**Deep Map Keys** recurses through an object and transforms its keys &ndash; and
the keys of any nested objects &ndash; according to some function. Circular
references are supported.

To transform the *values* of an object rather than its keys, use
[Deep Map][deep-map].

## Install

Install Deep Map Keys via [npm][npm].

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
    { user_id: 3820, user_name: 'Rafiki' },
    { user_id: 8391, user_name: 'Zazu' }
  ]
};

function snakeToCamel(key) {
  return key.replace(/_(\w)/g, (match, char) => char.toUpperCase());
}

let result = deepMapKeys(comment, snakeToCamel);
```

And the result will look like this:

```js
{
  commentId: 42,
  userId: 1024,
  userName: 'Mufasa',
  content: 'You deliberately disobeyed me.',
  viewedBy: [
    { userId: 3820, userName: 'Rafiki' },
    { userId: 8391, userName: 'Zazu' }
  ]
}
```

## API

#### `deepMapKeys(object, mapFn, [options])`

#### Parameters

<table>
  <thead>
    <tr>
      <th align="left">Param</th>
      <th align="left">Type</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>object</td>
      <td><code>any</code></td>
      <td>
        The object whose keys are to be transformed. Typically, this will be
        a complex object containing other nested objects. This object may be an
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">
        <code>Array</code></a>, in which case the keys of any objects it
        contains will be transformed. The object may contain circular
        references.
      </td>
    </tr>
    <tr>
      <td>mapFn</td>
      <td><code>function</code></td>
      <td>
        The function used to transform each key. The function is
        called with two arguments:
        <ul>
          <li>
            <strong>key</strong> &lt;<code>string</code>&gt;
            The key being transformed
          </li>
          <li>
            <strong>value</strong> &lt;<code>any</code>&gt;
            The value of the node whose key is being transformed
          </li>
        </ul>
        The return value determines the new name of the key, and must therefore
        be a string.
      </td>
    </tr>
    <tr>
      <td>[options]</td>
      <td><code>object</code></td>
      <td>
        An optional options object. The following option is accepted:
        <ul>
          <li>
            <strong>thisArg</strong> &lt;<code>any=undefined</code>&gt;
            Sets the value of
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"><code>this</code></a>
            within <code>mapFn()</code>
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Returns

Returns a new object.

## TypeScript

[TypeScript][typescript] declarations are included in the package. Just import
the module, and things will just work.

The shape of the returned object cannot be inferred from the inputs; however it
can be defined by passing a single type argument.

```ts
interface Result {
  userName: string;
}

let result = deepMapKeys<Result>({user_name: 'Pumbaa'}, snakeToCamel);

let name = result.userName; // Everything is OK :)
```

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
[deep-map]: https://github.com/akim-mcmath/deep-map
[snake-case]: https://en.wikipedia.org/wiki/Snake_case
[camel-case]: https://en.wikipedia.org/wiki/CamelCase
[typescript]: http://www.typescriptlang.org/
