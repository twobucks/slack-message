'use strict'
const test = require('ava')
const slack = require('../index')

test('It should not send the message', t => {
  t.throws(() => slack.send({}))
})
