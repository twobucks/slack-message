# Slack Message [![Build Status](https://travis-ci.org/twobucks/slack-message.svg?branch=master)](https://travis-ci.org/twobucks/slack-message) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


Send messages from your terminal directly to the Slack channel.

The idea for this package can be found [here](https://github.com/mikaelbr/open-source-ideas/issues/2).

## Install

```
$ npm i slack-message -g
```

## Usage

You will need a working token. The easiest way to get a testing one is [api.slack.com/web](https://api.slack.com/web).
If you need a live token please follow the instructions about oAuth [api.slack.com/docs/oauth](https://api.slack.com/docs/oauth).

```
$ slack

  Usage: slack [options] <message> <channel name>

  Options:

  -h, --help           output usage information
  -V, --version        output the version number
  -t, --token <token>  token to use, reads SLACK_TOKEN if provided
  -s, --save-token     saves token for later use
```

## Examples

Sending a message with inline token
```
$ slack -t "token-123-321" "My Message" "channel"
```

Sending a message and saving the token for a later use
```
$ slack -t "token-123-321" -s "My Message" "channel"
```

If you have a saved token
```
$ slack "My Message" "channel"
```

## License

MIT

## Sponsors

Two Bucks Ltd © 2016

<a href="https://twobucks.co">
![https://twobucks.co](https://twobucks.co/assets/images/logo-small.png)
</a>
