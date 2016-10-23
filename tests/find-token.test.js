'use strict'
const fs = require('fs')
const test = require('ava')
const tokenHelper = require('../lib/token-helper')

const findToken = tokenHelper.findToken

const fileToken = 'FILE_TOKEN'
const envToken = 'ENV_TOKEN'
const argToken = 'ARG_TOKEN'
const testTokenPath = 'test.find-token.token'

test.before(() => {
  process.env.SLACK_TOKEN = envToken
  tokenHelper.saveToken(fileToken, testTokenPath)
})

test.after(() => {
  if (fs.existsSync(testTokenPath)) {
    process.env.SLACK_TOKEN = null
    fs.unlinkSync(testTokenPath)
  }
})

test('token passed as an argument has highest priority', t => {
  const token = findToken(argToken)

  t.is(token, argToken)
})

test('token saved in a file has medium priority', t => {
  const token = findToken(null, testTokenPath)

  t.is(token, fileToken)
})

test('token saved in an env var has lowest priority', t => {
  tokenHelper.removeToken(testTokenPath)

  const token = findToken(null, testTokenPath)
  t.is(token, envToken)

  tokenHelper.saveToken(fileToken, testTokenPath)
})
