"use strict";
const request = require("request");
const log = require("npmlog");

const util = require("./lib/util");
const urlGenerator = require("./lib/urlGenerator");
const token = require('./lib/tokenHelper');

const args = process.argv.slice(2);

function slackMessage(){
  let message = token.generateMessageWithToken(args);
  checkAction();

  if (token.tokenExists()) {
    message = token.generateMessegeWithoutToken(args);
  }

  sendMessage(message);
}

function checkAction() {
  if (args.length == 1 && args[0] === "delete-token") {
    token.deleteToken();
  } else if(args.length == 2 && args[0] === "save-token") {
    token.saveToken(args[1]);
  }
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
