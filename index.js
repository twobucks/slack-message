'use strict'
const request = require('request-promise')
const log = require('npmlog')

const util = require('./lib/util')
const urlGenerator = require('./lib/url-generator')
const tokenHelper = require('./lib/token-helper')

function findToken(token, path) {
  token = token || tokenHelper.getToken(path) ||
    process.env.SLACK_TOKEN
  return token
}

function generateMessageObject(channel, text, opts) {
  return {
    channel,
    token: opts.token,
    text
  }
}

function send(channel, text, opts) {
  opts = opts || {}

  opts.token = findToken(opts.token)

  if (!opts.token) {
    throw new Error('Token is required')
  }

  if (!text) {
    throw new Error('Message is required')
  }

  if (!channel) {
    throw new Error('Channel is required')
  }

  if (opts.saveToken) {
    tokenHelper.saveToken(opts.token)
  }

  const message = generateMessageObject(channel, text, opts)

  const sendMessageUrl = urlGenerator.generateSlackUrl(message)

  return postToSlack(sendMessageUrl)
}

function postToSlack(url) {
  if (typeof url !== 'string') {
    util.showErrors(url)
    throw new Error('Could not generate a valid url :(')
  }

  const spinner = util.startSpinner('Sending message..', 8)
  const promise = request.get(url)

  promise.then(body => {
    const bodyJSON = JSON.parse(body)
    spinner.stop()
    process.stdout.write('\n')
    if (!bodyJSON.ok) {
      throw new Error(body)
    }
    log.info('Message sent!')
  }, err => {
    if (err) {
      throw err
    }
  })

  return promise
}

module.exports = {
  send,
  postToSlack,
  findToken
}
