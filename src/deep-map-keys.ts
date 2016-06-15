import {isArray, isFunction, isObject, isVoid} from './lang';

export interface MapFn {
  (key: string, value: any): string;
}

export interface Options {
  thisArg?: any;
}

export function deepMapKeys<T>(object: any, mapFn: MapFn, options?: Options): T {
  options = isVoid(options) ? {} : options;

  if (!mapFn) {
    throw new Error('mapFn is required');
  } else if (!isFunction(mapFn)) {
    throw new TypeError('mapFn must be a function');
  } else if (!isObject(options)) {
    throw new TypeError('options must be an object');
  }

  return map(object, mapFn, options);
}

function map(value: any, fn: MapFn, opts: Options): any {
  return isArray(value) ? mapArray(value, fn, opts) :
    isObject(value) ? mapObject(value, fn, opts) :
    value;
}

function mapArray(arr: any[], fn: MapFn, opts: Options): any[] {
  let result: any[] = [];
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    result.push(map(arr[i], fn, opts));
  }

  return result;
}

function mapObject(obj: {[key: string]: any}, fn: MapFn, opts: Options): {[key: string]: any} {
  let result: {[key: string]: any} = {};

  for (let key in obj) {
    let value = obj[key];
    result[fn.call(opts.thisArg, key, value)] = map(value, fn, opts);
  }

  return result;
}
