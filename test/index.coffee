chai = require 'chai'
sinonChai = require 'sinon-chai'
sinon = require 'sinon'
deepMapKeys = require '../lib'

before ->
  chai.use sinonChai
  chai.should()

err = (fn, ctor) ->
  fn.should.throw ctor

describe 'deepMapKeys(object, transformFn, [options])', ->
  snakeToCamel = null
  camelMap = null

  beforeEach ->
    snakeToCamel = sinon.spy (str) ->
      str.replace /_(\w)/g, (match, char) ->
         char.toUpperCase()

    camelMap = (object, options) ->
      deepMapKeys object, snakeToCamel, options

  it 'is the main module', ->
    deepMapKeys.should.equal require('..')

  it 'is a function', ->
    deepMapKeys.should.be.a 'function'

  context 'simple object is passed', ->

    it 'transforms keys', ->
      camelMap
        user_id: 42
        user_name: 'Mufasa'
      .should.deep.equal
        userId: 42
        userName: 'Mufasa'

  context 'nested object is passed', ->

    it 'transforms keys', ->
      camelMap
        user_info:
          user_id: 42
          user_name: 'Mufasa'
      .should.deep.equal
        userInfo:
          userId: 42
          userName: 'Mufasa'

  context 'complex object is passed', ->

    it 'transforms keys', ->
      camelMap
        user_id: 42
        user_name: 'Mufasa'
        viewed_by: [
          user_id: 100, user_name: 'Rafiki'
        ,
          user_id: 101, user_name: 'Zazu'
        ]
      .should.deep.equal
        userId: 42
        userName: 'Mufasa'
        viewedBy: [
          userId: 100, userName: 'Rafiki'
        ,
          userId: 101, userName: 'Zazu'
        ]

  context 'complex array is passed', ->

    it 'transforms keys', ->
      camelMap [
        user_id: 100, user_name: 'Rafiki'
      ,
        user_id: 101, user_name: 'Zazu'
      ]
      .should.deep.equal [
        userId: 100, userName: 'Rafiki'
      ,
        userId: 101, userName: 'Zazu'
      ]

  context '@options.thisArg is set', ->

    it 'sets context in @transformFn', ->
      camelMap({user_id: 41}, {thisArg: 42})
      snakeToCamel.should.have.been.calledOn 42

  context 'non-object is passed as @options', ->

    it 'throws TypeError', ->
      err((-> camelMap({user_id: 42}, 42)), TypeError)

  context 'non-function is passed as @transformFn', ->

    it 'throws TypeError', ->
      err((-> deepMapKeys({user_id: 42}, 42)), TypeError)

  context 'undefined @transformFn', ->

    it 'throws Error', ->
      err((-> deepMapKeys({user_id: 42})), Error)

  describe 'return value', ->

    it 'is a new object', ->
      obj = user_id: 42
      camelMap(obj).should.not.equal obj
      obj.should.deep.equal user_id: 42
