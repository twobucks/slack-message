'use strict'
const fs = require('fs')
const log = require('npmlog')
const homeDir = require('home-dir')

const defaultPath = homeDir('.slack.token')

function tokenExists(filePath) {
  filePath = filePath || defaultPath
  return fs.existsSync(filePath)
}

function saveToken(token, filePath) {
  filePath = filePath || defaultPath
  fs.writeFileSync(filePath, token)
  return log.info(`Token saved: ${token}`)
}

function removeToken(filePath) {
  filePath = filePath || defaultPath
  if (tokenExists(filePath)) {
    fs.unlinkSync(filePath)
    return log.info('Token deleted')
  }
}

function getToken(filePath) {
  filePath = filePath || defaultPath
  if (tokenExists(filePath)) {
    return fs.readFileSync(filePath).toString()
  }
}

function findToken(token, path) {
  return token || getToken(path) ||
    process.env.SLACK_TOKEN
}

module.exports = {
  tokenExists,
  saveToken,
  removeToken,
  getToken,
  findToken
}
