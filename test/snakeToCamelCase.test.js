var expect = require('chai').expect
var spy = require('sinon').spy
var snakeToCamelCase = require('../lib/snakeToCamelCase')

describe('snakeToCamelCase', function () {
  var expected
  var requestMock
  var nextSpy

  beforeEach(function () {
    requestMock = {}
    nextSpy = spy()
  })

  it('Should change snake_case keys in object to camelCase', function () {
    expected = {
      thisShould: 'beLikeThis',
      thisWill: 'not_change'
    }

    requestMock.body = {
      this_should: 'beLikeThis',
      thisWill: 'not_change'
    }

    snakeToCamelCase(requestMock, {}, nextSpy)

    expect(requestMock.body).to.deep.equal(expected)
  })

  it('Should change snake_case deep keys in object to camelCase', function () {
    expected = {deepChange: 'yes'}

    requestMock.body = {
      this_should: 'beLikeThis',
      thisWill: {
        deep_change: 'yes'
      }
    }

    snakeToCamelCase(requestMock, {}, nextSpy)

    expect(requestMock.body.thisWill).to.deep.equal(expected)
  })

  it('Should call next function when done', function () {
    snakeToCamelCase(requestMock, {}, nextSpy)

    expect(nextSpy.calledOnce).to.be.true
  })
})
