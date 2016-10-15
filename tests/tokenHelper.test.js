"use strict";
const test = require("ava");
const fs = require('fs');

const token = require("../lib/tokenHelper");
const newToken = "this-is-a-new-token";

test("It should return false because token doesn't exists", t => {
  fs.openSync(token.tokenLocation, 'w');
  t.is(token.tokenExists(), false);
  fs.unlinkSync(token.tokenLocation);
});

test("It should create and delete the token", t => {
  fs.openSync(token.tokenLocation, 'w');

  token.saveToken(newToken);
  t.is(token.tokenExists(), true);
  t.is(token.getToken(), newToken);

  token.deleteToken();
  t.is(token.tokenExists(), false);
  t.is(token.getToken(), '');
  fs.unlinkSync(token.tokenLocation);
});
