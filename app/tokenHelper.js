"use strict";
const fs = require('fs');

const tokenLocation = "slack.token";

if (!fs.existsSync(tokenLocation)) { // eslint-disable-line node/no-deprecated-api
  fs.openSync(tokenLocation, 'w');
}

module.exports = {
  tokenLocation,
  tokenExists: () => {
    var token = fs.readFileSync(tokenLocation).toString();
    return (token.length > 0);
  },
  saveToken: (token) => {
    fs.writeFileSync(tokenLocation, token);
  },
  getToken: () => {
    return fs.readFileSync(tokenLocation).toString();
  },
  deleteToken: () => {
    fs.truncateSync(tokenLocation);
  }
};