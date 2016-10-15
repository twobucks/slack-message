'use strict'
const fs = require('fs')
const test = require('ava')
const tokenHelper = require('../lib/token-helper')

const tokenLocation = 'test.helper.token'
const newToken = 'this-is-a-new-token'

test.after(() => {
  if (fs.existsSync(tokenLocation)) {
    return fs.unlinkSync(tokenLocation)
  }
})

test('It should return false because token doesn\'t exist', t => {
  t.is(tokenHelper.tokenExists(tokenLocation), false)
})

test('It should create a token file', t => {
  tokenHelper.saveToken(newToken, tokenLocation)
  t.is(tokenHelper.tokenExists(tokenLocation), true)
  t.is(tokenHelper.getToken(), newToken)
})

test('it should remove a token file', t => {
  tokenHelper.saveToken(newToken, tokenLocation)
  tokenHelper.removeToken(tokenLocation)

  t.is(tokenHelper.tokenExists(tokenLocation), false)
})
