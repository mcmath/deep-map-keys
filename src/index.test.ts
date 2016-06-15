import chai = require('chai');
import sinonChai = require('sinon-chai');
import sinon = require('sinon');
import deepMapKeys = require('./');

before(() => {
  chai.use(sinonChai);
  chai.should();
});

describe('deepMapKeys(object, mapFn, [options])', () => {
  let caps: (key: string) => string;

  beforeEach(() => {
    caps = sinon.spy((key: string) => key.toUpperCase());
  });

  it('exports a function', () => {
    deepMapKeys.should.be.a('function');
  });

  describe('@object: any', () => {

    it('transforms keys of simple object', () => {
      deepMapKeys({one: 1, two: 2}, caps).should.deep.equal({ONE: 1, TWO: 2});
    });

    it('transforms keys of object with nested objects/arrays', () => {
      deepMapKeys({one: 1, obj: {two: 2, three: 3}, arr: [4, 5]}, caps)
        .should.deep.equal({ONE: 1, OBJ: {TWO: 2, THREE: 3}, ARR: [4, 5]});
    });

    it('transforms keys of array with nested object/array', () => {
      deepMapKeys([1, {two: 2, three: 3, arr: [4, {five: 5}]}], caps)
        .should.deep.equal([1, {TWO: 2, THREE: 3, ARR: [4, {FIVE: 5}]}]);
    });

  });

  describe('@mapFn(key: string, value: any): string', () => {

    it('throws Error if undefined', () => {
      deepMapKeys.bind(null, {one: 1}).should.throw(Error);
    });

    it('throws TypeError if not a function', () => {
      deepMapKeys.bind(null, {one: 1}, 42).should.throw(TypeError);
    });

    it('is called once per object property', () => {
      deepMapKeys({one: 1, obj: {two: 2, three: 3}, arr: [4, 5]}, caps);
      caps.should.have.callCount(5);
    });

    it('is called with @key as first argument', () => {
      deepMapKeys({one: 1, arr: [2, 3]}, caps);
      caps.should.have.been.calledWith('one');
      caps.should.have.been.calledWith('arr');
    });

    it('is called with @value as second argument', () => {
      let {any} = sinon.match;
      deepMapKeys({one: 1, arr: [2, 3]}, caps);
      caps.should.have.been.calledWith(any, 1);
      caps.should.have.been.calledWithMatch(any, [2, 3]);
    });

  });

  describe('@options?', () => {

    it('throws TypeError if defined but not an object', () => {
      deepMapKeys.bind(null, {one: 1}, caps, 42).should.throw(TypeError);
    });

    describe('option: thisArg', () => {

      it('sets context within @mapFn', () => {
        deepMapKeys({one: 1, arr: [2, 3]}, caps, {thisArg: 42});
        caps.should.have.been.calledOn(42);
      });

      it('defaults to undefined', () => {
        deepMapKeys({one: 1, arr: [2, 3]}, caps);
        caps.should.have.been.calledOn(undefined);
      });

    });

  });

});
