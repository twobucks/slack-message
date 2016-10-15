'use strict'
const postMessageSchema = {
  token: {
    presence: true
  },
  channel: {
    presence: true
  },
  text: {
    presence: true
  }
}

module.exports = {
  postMessageSchema
}
