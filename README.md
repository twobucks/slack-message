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

If you need a live token please follow the instructions about oAuth [api.slack.com/docs/oauth](https://api.slack.com/docs/oauth)
___

Sending your first message

```
  slack-message "token" "channel" "My message here"
```

If you save a token you can use a shorter version
```
  slack-message "channel" "My message here"
```

To save a token  
```
  slack-message "save-token" "here-is-my-token"
```

To delete a token  
```
  slack-message "delete-token"
```


## License

MIT

## Sponsors

Two Bucks Ltd © 2016

<a href="https://twobucks.co">
![https://twobucks.co](https://twobucks.co/assets/images/logo-small.png)
</a>
