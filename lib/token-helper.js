'use strict'
const fs = require('fs')
const log = require('npmlog')

const tokenLocation = 'slack.token'

if (!fs.existsSync(tokenLocation)) { // eslint-disable-line node/no-deprecated-api
  fs.openSync(tokenLocation, 'w')
}

module.exports = {
  tokenLocation,
  tokenExists: () => {
    const token = fs.readFileSync(tokenLocation).toString()
    return (token.length > 0)
  },
  saveToken: token => {
    fs.writeFileSync(tokenLocation, token)
    return log.info(`Token saved: ${token}`)
  },
  getToken: () => {
    return fs.readFileSync(tokenLocation).toString()
  },
  deleteToken: () => {
    fs.truncateSync(tokenLocation)
    return log.info('Token deleted')
  },
  generateMessageWithEnv: args => {
    const token = process.env.SLACK_TOKEN
    if (token && args && args.length === 2) {
      return {
        token,
        channel: args[0],
        text: args[1]
      }
    }
  },
  generateMessegeWithoutToken: args => {
    let message = this.generateMessageWithEnv()
    if (args.length < 2) {
      return log.error('All properties are required \'slack-message <channel> <message>\'')
    } else if (args.length > 2) {
      return log.error('No additional properties allowed \'slack-message <channel> <message>\'')
    } else { // eslint-disable-line no-else-return
      message = {
        token: this.getToken(),
        channel: args[0],
        text: args[1]
      }
    }
    return message
  },
  generateMessageWithToken: args => {
    if (args.length < 3) {
      return log.error('All properties are required \'slack-message <token> <channel> <message>\'')
    } else if (args.length > 3) {
      return log.error('No additional properties allowed \'slack-message <token> <channel> <message>\'')
    } else { // eslint-disable-line no-else-return
      return {
        token: args[0],
        channel: args[1],
        text: args[2]
      }
    }
  }
}
