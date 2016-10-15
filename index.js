"use strict";
const request = require("request");
const log = require("npmlog");

const util = require("./lib/util");
const urlGenerator = require("./lib/urlGenerator");
const token = require('./lib/tokenHelper');

const args = process.argv.slice(2);

function slackMessage(){
  if (args.length == 1 && args[0] == "delete-token") {
    token.deleteToken();
    return log.info("Token deleted");
  } else if(args.length == 2 && args[0] == "save-token") {
    token.saveToken(args[1]);
    return log.info("Token saved: " + args[1]);
  }

  const message = {};

  if (token.tokenExists()) {
    if (args.length < 2) {
      return log.error("All properties are required 'slack-message <channel> <message>'");
    } else if (args.length > 2) {
      return log.error("No additional properties allowed 'slack-message <channel> <message>'");
    } else {
      Object.assign(message, {
        token: token.getToken(),
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

module.exports = {
  slackMessage,
  sendMessage
};
