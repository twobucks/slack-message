'use strict'
const request = require('request')
const log = require('npmlog')

const util = require('./lib/util')
const urlGenerator = require('./lib/url-generator')
const tokenHelper = require('./lib/token-helper')

function findToken(token, path) {
  token = token || tokenHelper.getToken(path) ||
    process.env.SLACK_TOKEN
  return token
}

function generateMessageObject(message, opts) {
  return {
    token: opts.token,
    channel: opts.channelName,
    text: message
  }
}

function send(message, opts) {
  opts = opts || {}

  opts.token = findToken(opts.token)

  if (!opts.token) {
    throw new Error('Token is required')
  }

  if (opts.saveToken) {
    tokenHelper.saveToken(opts.token)
  }

  message = generateMessageObject(message, opts)

  const sendMessageUrl = urlGenerator.generateSlackUrl(message)

  if (typeof sendMessageUrl !== 'string') {
    util.showErrors(sendMessageUrl)
    throw new Error('Could not generate a valid url :(')
  }

  const spinner = util.startSpinner('Sending message..', 8)
  request.get(sendMessageUrl, (err, res, body) => {
    if (err) {
      throw new Error(err)
    }
    const bodyJSON = JSON.parse(body)
    spinner.stop()
    process.stdout.write('\n')
    if (!bodyJSON.ok) {
      throw new Error(body)
    }
    log.info('Message sent!')
  })
}

module.exports = {
  send,
  findToken
}
