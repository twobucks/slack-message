const slack = require("slack");
const log = require("npmlog");
const Spinner = require('cli-spinner').Spinner;
const args = process.argv.slice(2);

function slackMessage(){
  if(args.length < 3) {
    return log.error("All fields are required 'slack-message <token> <channel> <message>'");
  } else if (args.length > 3) {
    return log.error("No additional fields allowed 'slack-message <token> <channel> <message>'");
  }
  const message = {
    token: args[0],
    channel: args[1],
    text: args[2]
  }
  sendMessage(message);
}

function sendMessage(message) {
  const spinner = new Spinner("Sending message..");
  spinner.setSpinnerString(8);
  spinner.start();
  slack.chat.postMessage(message, (err, data) => {
    process.stdout.write('\n');
    spinner.stop();
    if(err) {
      return log.error(err);
    }
    log.info("Message sent!");
  });
}

module.exports = slackMessage;
