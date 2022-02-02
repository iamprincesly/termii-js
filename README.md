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

-   Send SMS

```javascript
const Termii = require('termii-js');

const termii = new Termii('api_key', 'sender_id');

// Send simple SMS
const sms = await termii.sendSMS('2347063516197', 'Hello this is a message');

// Set SMS options
const options = { channel: 'generic' };
const sms = await termii.sendSMS(
    '2347065548126',
    'Hello this is a message',
    options
);

// Optionally you can set SMS option first before calling the sendSMS method
termii.setSMSOptions(options);
const sms = await termii.sendSMS('2347065940103', 'Hello this is a message');

// You can as well send to many numbers by passing array of numbers as strings
const recipients = ['2347065026902', '2347087675643'];
const sms = await termii.sendSMS(recipients, 'Hello this is a message');

// Pormise join
```

You can chain ```then()``` and ```catch()``` method like below

```javascript
termii.sendSMS(recipients, 'this is a test message')
    .then((response) => {
        if (response.code === 'ok') {
            // Do something interesting
        }
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
```

in async/await

```javascript
app.get('/api/sendsms', async (req, res, next) => {
    try {
        const sms = await termii.sendSMS(recipients, 'this is a test message');
        if (sms.code === 'ok') {
            // Do something interesting here
        }

        res.json(sms);
    } catch (err) {
        console.log(err);
        next(err);
    }
});
```
You can send SMS with Termii auto-generated phone number as well. The ```sendSMSWithAutomatedNumber()``` method accept only two arguments. First arguments ```'recipients' [string || Array]``` and ```'message' [string]```. 

```javascript
const Termii = require('termii-js');

const termii = new Termii('api_key', 'sender_id');

termii.sendSMSWithAutomatedNumber(recipients, 'this is a test message')
    .then((response) => {
        if (response.code === 'ok') {
            // Do something interesting
        }
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
```
## Configuration
You can specify the API key and the sender ID in the environment variable ```'TERMII_API_KEY'``` and ```'TERMII_SENDER_ID'``` then create a new instance without passing the constructor arguments.

NOTE: If you don't specify sender ID in the environment variable ```'TERMII_SENDER_ID'``` you will have to pass it to the constructor as second argument else "Termii" will be used as a default sender ID. API key is made mandatory, you specify it in the environment variable ```'TERMII_API_KEY'``` or pass to the constructor
```javascript
const Termii = require('termii-js');

// Create instance without constructor arguments
// NOTE: You need specify this arguments in environment
// variable 'TERMII_API_KEY' and 'TERMII_SENDER_ID'
const termii = new Termii();
```
## Comming soon

Send token and verify token

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
