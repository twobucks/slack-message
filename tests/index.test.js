'use strict'
const test = require('ava')
const slack = require('../index')

test('it should generate a proper message object for a channel', t => {
  const txt = 'This is just another test'
  const msg = slack.generateMessageObject('testing', txt, {token: 123})
  t.deepEqual(msg, {
    channel: 'testing',
    text: txt,
    token: 123
  })
})

test('it should generate a proper message object for a channel with hash', t => {
  const txt = 'This is just another test'
  const msg = slack.generateMessageObject('#testing', txt, {token: 123})
  t.deepEqual(msg, {
    channel: 'testing',
    text: txt,
    token: 123
  })
})

test('it should generate a proper message object for a user', t => {
  const txt = 'This is just another test'
  const msg = slack.generateMessageObject('@chef', txt, {token: 123})
  t.deepEqual(msg, {
    channel: '@chef',
    text: txt,
    token: 123
  })
})

test('it should not send the message', t => {
  t.throws(() => slack.send({}))
})
