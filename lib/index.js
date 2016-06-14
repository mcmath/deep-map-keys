'use strict';

var isArray = Array.isArray;

function deepMapKeys(obj, fn, opts) {
  opts = opts || {};

  if (!fn) {
    err(Error, 'transformFn must be defined');
  } else if (!isFunction(fn)) {
    err(TypeError, 'transformFn must be a function');
  } else if (!isObject(opts)) {
    err(TypeError, 'options must be an object or undefined');
  }

  return map(obj, fn, opts);
}

function map(value, fn, opts) {
  return isArray(value) ? mapArray(value, fn, opts) :
    isObject(value) ? mapObject(value, fn, opts) :
    value;
}

function mapArray(arr, fn, opts) {
  var result = [];
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    result.push(map(arr[i], fn, opts));
  }

  return result;
}

function mapObject(obj, fn, opts) {
  var result = {};

  for (var key in obj) {
    result[fn.call(opts.thisArg, key)] = map(obj[key], fn, opts);
  }

  return result;
}

function isFunction(value) {
  return typeof value === 'function';
}

function isObject(value) {
  return typeof value === 'object' || isFunction(value);
}

function err(ctor, msg) {
  var e = new ctor(msg);
  Error.captureStackTrace(e, deepMapKeys);
  throw e;
}

module.exports = deepMapKeys;
