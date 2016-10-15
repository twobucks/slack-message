const validate = require('validate.js')
const constraints = require('./constraints')

function generateSlackUrl(message) {
  const notValid = validate(message, constraints.postMessageSchema);
  if(notValid) {
    // convert it to array because notValid is an object
    const notValidArray = Object.keys(notValid).map(key => notValid[key][0])
    return notValidArray;
  }
  return `https://slack.com/api/chat.postMessage?token=${message.token}` +
          `&channel=${message.channel}&text=${message.text}`
}

module.exports = {
  generateSlackUrl
}
