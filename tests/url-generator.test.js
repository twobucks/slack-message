'use strict'
const test = require('ava')
const urlGenerator = require('../lib/url-generator')

test('It should fail with url generation', t => {
  const url = urlGenerator.generateSlackUrl({})
  t.deepEqual(url, ['Token can\'t be blank', 'Channel can\'t be blank', 'Text can\'t be blank'])
})

test('It should fail with url generation because message is missing', t => {
  const message = {
    token: '123',
    channel: '321'
  }
  const url = urlGenerator.generateSlackUrl(message)
  t.deepEqual(url, ['Text can\'t be blank'])
})

test('It should generate a valid post message url', t => {
  const message = {
    token: '123',
    channel: '321',
    text: 'This is test'
  }
  const url = urlGenerator.generateSlackUrl(message)
  t.is(url, 'https://slack.com/api/chat.postMessage?token=123&channel=321&text=This is test')
})
