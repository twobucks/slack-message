"use strict";
const validate = require("validate.js");
const constraints = require("./constraints");

function generateSlackUrl(message) {
  const notValid = validate(message, constraints.postMessageSchema);
  if(notValid) {
    return notValid;
  }
  return `https://slack.com/api/chat.postMessage?token=${message.token}` +
          `&channel=${message.channel}&text=${message.text}`;
}

module.exports = {
  generateSlackUrl
}
