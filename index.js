"use strict";
const request = require("request");
const log = require("npmlog");
const util = require("./app/util");
const urlGenerator = require("./app/urlGenerator");
const args = process.argv.slice(2);

function slackMessage(){
  if(args.length < 3) {
    return log.error("All properties are required 'slack-message <token> <channel> <message>'");
  } else if (args.length > 3) {
    return log.error("No additional properties allowed 'slack-message <token> <channel> <message>'");
  }
  const message = {
    token: args[0],
    channel: args[1],
    text: args[2]
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
    process.stdout.write('\n');
    spinner.stop();
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
