# Slack Message [![Build Status](https://travis-ci.org/twobucks/slack-message.svg?branch=master)](https://travis-ci.org/twobucks/slack-message) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


##### Send messages from your terminal directly to the slack channel.
The idea for this package can be found [here.](https://github.com/mikaelbr/open-source-ideas/issues/2)

## Install
```
  npm i slack-message -g
```

## Usage
#####  First of all you will need an working token.
The easiest way to get a testing one is [api.slack.com/web](https://api.slack.com/web)

If you need a live token please follow the instructions about oAuth [api.slack.com/docs/oauth](https://api.slack.com/docs/oauth).

___

```
  slack-message [options] <channel> <message>
```
##### Token can be saved as `SLACK_TOKEN` in `env` and it will be used automatically.
#### Options
* `-h`, `--help` - output usage information
* `-v`, `--version` - output the version number
* `-t`, `--token` - token to use for this message
* `-s`, `--save-token` - sending a message and saving a token for later use

## Examples

Sending a message with inline token

```
  slack-message -t "token-123-321" "channel" "My Message"
```

Sending a message and saving the token for a later use
```
  slack-message -s "token-123-321" "channel" "My Message"
```

If you have a saved token
```
  slack-message "channel" "My Message"
```


## License

MIT

## Sponsors

Two Bucks Ltd © 2016

<a href="https://twobucks.co">
![https://twobucks.co](https://twobucks.co/assets/images/logo-small.png)
</a>
