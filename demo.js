/**
 * ----------------------------------------------------------------
 * This file is part of the Termii JS SDK.
 * A Node.js wrapper made for Termii API.
 * For more information, visit: https://developer.termii.com
 *
 * (c) Sylvanus Etim <iamprincesly@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * ----------------------------------------------------------------
 */
const Termii = require('./lib/Termii');
const api_key = '{api key}';
const options = { channel: 'generic' };
const senderID = 'My sender ID'

const termii = new Termii(api_key, senderID);
termii.setSMSOptions(options);
const recipients = ['2347065026902', '2347087675643'];

// Send SMS
termii
    .sendSMS(recipients, 'another test message from my new sender ID')
    .then((response) => {
        if (response.code === 'ok') {
            console.log('Wow it work');
        }
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

// Send Bulk SMS
termii
    .sendBulkSMS(recipients, 'this is a test message')
    .then((response) => {
        if (response.code === 'ok') {
            console.log('Wow it work');
        }
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

// Send with auto-generated number
termii
    .sendSMSWithAutomatedNumber(recipients, 'this is a test message')
    .then((response) => {
        if (response.code === 'ok') {
            console.log('Wow it work');
        }
    })
    .catch((err) => {
        console.log(err);
    });
