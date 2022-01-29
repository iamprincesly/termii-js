# Termii API Client

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/iamprincesly/erroran/Release?style=flat-square) ![GitHub Repo stars](https://img.shields.io/github/stars/iamprincesly/erroran?style=flat-square) ![Twitter Follow](https://img.shields.io/twitter/follow/iamprincesly?style=flat-square)

A NodeJS wrapper made for Termii API

## Termii API Documentation

For complete API documentation, up-to-date parameters, responses and errors, please refer to https://developer.termii.com.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

```sh
$ npm install termii-js
```

## Usage

### Simple usage examples
- Send SMS

```javascript
const Termii = require('termii');

const termii = new Termii('api_key', 'sender_id');

// Send simple SMS
const sms = await termii.sendSMS('2347063516197', 'Hello this is a message');

// Set SMS options
const options = { channel: 'generic' }
const sms = await termii.sendSMS('2347065526106', 'Hello this is a message', options);

// Optionally you can set SMS option first before calling the sendSMS method
termii.setSMSOptions(options);
const sms = await termii.sendSMS('2347065526106', 'Hello this is a message');

// You can as well send to many numbers by passing array of numbers as strings
const recipients = ['2347065026902', '2347087675643'];
const sms = await termii.sendSMS(recipients, 'Hello this is a message');
```

## Comming soon
Send token and verify token

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Sylvanus Etim](https://github.com/iamprincesly) ([iamprincesly@gmail.com](mailto:iamprincesly@gmail.com))