'use strict'
const test = require('ava')

const main = require('../')

test('should create a slack message', async t => {
  if (!process.env.SLACK_TOKEN) {
    console.log('[WARN] SLACK_TOKEN not set, integration test skipped.')
    return
  }

  const response = await main.send('pancakes', 'testing pancakes?!"#$%"')
  t.true(JSON.parse(response).ok, 'response should be success')
})
