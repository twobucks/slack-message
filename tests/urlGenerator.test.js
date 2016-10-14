"use strict";
const test = require("ava");
const urlGenerator = require("../app/urlGenerator");

test("It should fail with url generation", t => {
  const url = urlGenerator.generateSlackUrl({});
  t.deepEqual(url, {
    token: [ 'Token can\'t be blank' ],
    channel: [ 'Channel can\'t be blank' ],
    text: [ 'Text can\'t be blank' ]
  });
});

test("It should fail with url generation because message is missing", t => {
  const message = {
    token: "123",
    channel: "321"
  }
  const url = urlGenerator.generateSlackUrl(message);
  t.deepEqual(url, {
    text: [ 'Text can\'t be blank' ]
  });
});

test("It should generate a valid post message url", t => {
  const message = {
    token: "123",
    channel: "321",
    text: "This is test"
  }
  const url = urlGenerator.generateSlackUrl(message);
  t.is(url, "https://slack.com/api/chat.postMessage?token=123&channel=321&text=This is test");
});
