import { isFunction, isNil, isObject } from 'lodash';
import { DeepMapKeys, MapFn, Opts } from './deep-map-keys';

function deepMapKeys<T>(object: any, mapFn: MapFn, options?: Opts): T {
  options = isNil(options) ? {} : options;

  if (!mapFn) {
    throw new Error('mapFn is required');
  } else if (!isFunction(mapFn)) {
    throw new TypeError('mapFn must be a function');
  } else if (!isObject(options)) {
    throw new TypeError('options must be an object');
  }

  return new DeepMapKeys(mapFn, options).map(object);
}

export = deepMapKeys;
