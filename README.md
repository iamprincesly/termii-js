# Termii JS SDK

A simple JS SDK for made for Termii API

## Usage

### Simple usage examples
```javascript
const Termii = require('termii');

const termii = new Termii('api_key', 'sender_id');

const options = { channel: 'generic' }

const sms = await termii.sendSMS('2347065526106', 'Hello this is a message', options);

// Optionally you can set SMS option separately like below
// but make sure you set it first before calling the sendSMS method
termii.setSMSOptions(options);
const sms = await termii.sendSMS('2347065526106', 'Hello this is a message');

// You can as well send to many numbers by passing array of numbers
const recipients = ['2347065026902', '2347087675643'];
const sms = await termii.sendSMS(recipients, 'Hello this is a message');
```