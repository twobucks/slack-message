const slack = require("slack");
const log = require("npmlog");
const Spinner = require('cli-spinner').Spinner;
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
  const spinner = startSpinner("Sending message..", 8);
  slack.chat.postMessage(message, (err, data) => {
    process.stdout.write('\n');
    spinner.stop();
    if(err) {
      return log.error(err);
    }
    log.info("Message sent!");
  });
}

function startSpinner(text, type) {
  const spinner = new Spinner(text);
  spinner.setSpinnerString(type);
  spinner.start();
  return spinner;
}

module.exports = slackMessage;
