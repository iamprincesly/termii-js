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

const api_key = '{apikeyhere}';
const options = { channel: 'generic' };

// Send SMS 
const termii = new Termii(api_key);
termii.setSMSOptions(options);
const recipients = ['2347065026902', '2347087675643'];
termii.sendSMS(recipients, 'Hello this is a message');
