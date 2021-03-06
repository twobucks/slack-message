# Slack Message

[![Build Status](https://travis-ci.org/twobucks/slack-message.svg?branch=master)](https://travis-ci.org/twobucks/slack-message) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![Downloads](https://img.shields.io/npm/dt/slack-message.svg)](https://npmjs.org/package/slack-message)

![](https://twobucks.co/assets/slack-message.gif)

Send messages from your terminal directly to the Slack channel. The idea for this was published in [mikaelbr/open-source-ideas](https://github.com/mikaelbr/open-source-ideas/issues/2).

Common use cases for this package are:

* get a Slack notification when a CI server finishes its work
* get a Slack notification when a deployment is complete
* get a Slack notification when any other process exits

## Install

```
$ npm i slack-message -g
```

## Usage

You will need a working token. The easiest way to get a testing one is [api.slack.com/web](https://api.slack.com/web).
If you need a live token please follow the instructions about oAuth [api.slack.com/docs/oauth](https://api.slack.com/docs/oauth).

```
  $ slack-message

  Usage: slack-message [options] <#channel | @user> <message>

  Options:

  -h, --help           output usage information
  -V, --version        output the version number
  -t, --token <token>  token to use, reads SLACK_TOKEN if provided
  -s, --save-token     saves token for later use
```

## Examples

Sending a message with inline token

```
$ slack-message -t token-123-321 #factory "I need some pancakes folks"
```

Sending a message and saving the token for a later use

```
$ slack-message -t token-123-321 -s #factory "really, I need pancakes"
```

Sending a direct message to a user

```
$ slack-message -t token-123-321 -s @chef "awesome pancakes!"
```

If you have a saved token

```
$ slack-message #general "send pancakes and hurry"
```

You can also pass an ENV variable

```
$ SLACK_TOKEN=token slack-message #random "I'm hungry"
```

## Alternatives

* [slack](https://github.com/smallwins/slack) - Slack API console for Node and the browser
* [slack-cli](https://github.com/candrholdings/slack-cli) - Slack CLI interface for various API endpoints

## License

MIT

## Sponsors

Two Bucks Ltd © 2016

[![twobucks.co](https://twobucks.co/assets/images/logo-small.png)](https://twobucks.co)
