const fs = require('fs')
const test = require('ava')
const token = require('../lib/token-helper')

const newToken = 'this-is-a-new-token'

test('It should return false because token doesn\'t exist', t => {
  fs.openSync(token.tokenLocation, 'w')
  t.is(token.tokenExists(), false)
  fs.unlinkSync(token.tokenLocation)
})

test('It should create a token', t => {
  fs.openSync(token.tokenLocation, 'w')

  token.saveToken(newToken)
  t.is(token.tokenExists(), true)
  t.is(token.getToken(), newToken)
})

test('It should delete a token', t => {
  token.deleteToken()
  t.is(token.tokenExists(), false)
  t.is(token.getToken(), '')
  fs.unlinkSync(token.tokenLocation)
})
