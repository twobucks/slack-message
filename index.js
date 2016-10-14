"use strict";
const request = require("request");
const log = require("npmlog");
const fs = require('fs');

const util = require("./app/util");
const urlGenerator = require("./app/urlGenerator");

const args = process.argv.slice(2);
const tokenLocation = 'slack.token';

function slackMessage(){
  if (args.length == 1 && args[0] == "delete-token") {
    deleteToken();
    return log.info("Token deleted");
  } else if(args.length == 2 && args[0] == "save-token") {
    saveToken(args[1]);
    return log.info("Token saved: " + args[1]);
  }

  const message = {};

  if (tokenExists()) {
    if (args.length < 2) {
      return log.error("All properties are required 'slack-message <channel> <message>'");
    } else if (args.length > 2) {
      return log.error("No additional properties allowed 'slack-message <channel> <message>'");
    } else {
      Object.assign(message, {
        token: getToken(),
        channel: args[0],
        text: args[1]
      });
    }
  } else {
    if (args.length < 3) {
      return log.error("All properties are required 'slack-message <token> <channel> <message>'");
    } else if (args.length > 3) {
      return log.error("No additional properties allowed 'slack-message <token> <channel> <message>'");
    } else {
      Object.assign(message, {
        token: args[0],
        channel: args[1],
        text: args[2]
      });
    }
  }

  sendMessage(message);
}

function sendMessage(message) {
  const sendMessageUrl = urlGenerator.generateSlackUrl(message);
  if(typeof sendMessageUrl !== "string") {
    util.showErrors(sendMessageUrl);
    throw new Error("Could not generate a valid url :(");
  }

  const spinner = util.startSpinner("Sending message..", 8);
  request.get(sendMessageUrl, (err, res, body) => {
    if(err) {
      throw new Error(err);
    }
    const bodyJSON = JSON.parse(body);
    spinner.stop();
    process.stdout.write('\n');
    if (!bodyJSON.ok) {
      throw new Error(body);
    }
    log.info("Message sent!");
  });
}

function tokenExists(){
  var token = fs.readFileSync(tokenLocation).toString();
  return (token.length > 0);
}

function saveToken(token){
  fs.writeFileSync(tokenLocation, token);
}

function getToken(){
  return fs.readFileSync(tokenLocation).toString();
}

function deleteToken(){
  fs.truncateSync(tokenLocation);
}

module.exports = {
  slackMessage,
  sendMessage
};
