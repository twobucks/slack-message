const request = require("request");
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

function generateSlackUrl(message) {
  return `https://slack.com/api/chat.postMessage?token=${message.token}` +
          `&channel=${message.channel}&text=${message.text}`;
}

function sendMessage(message) {
  const sendMessageUrl = generateSlackUrl(message);
  const spinner = startSpinner("Sending message..", 8);

  request.get(sendMessageUrl,(err, res, body) => {
    if(err) {
      return log.error(err);
    }
    const bodyJSON = JSON.parse(body);
    process.stdout.write('\n');
    spinner.stop();
    if (!bodyJSON.ok) {
      return log.error(body);
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
