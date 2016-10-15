'use strict'
const fs = require('fs')
const log = require('npmlog')

const defaultPath = 'slack.token'

if (!fs.existsSync(defaultPath)) { // eslint-disable-line node/no-deprecated-api
  fs.openSync(defaultPath, 'w')
}

function tokenExists(filePath) {
  filePath = filePath || defaultPath
  return fs.existsSync(filePath)
}

module.exports = {
  tokenExists,

  saveToken: (token, filePath) => {
    filePath = filePath || defaultPath
    fs.writeFileSync(filePath, token)
    return log.info(`Token saved: ${token}`)
  },

  removeToken: filePath => {
    filePath = filePath || defaultPath
    if (tokenExists(filePath)) {
      fs.unlinkSync(filePath)
      return log.info('Token deleted')
    }
  },

  getToken: filePath => {
    filePath = filePath || defaultPath
    if (tokenExists(filePath)) {
      return fs.readFileSync(filePath).toString()
    }
  }
}
