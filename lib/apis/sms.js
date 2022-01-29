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
const utils = require('../helpers/utils');
const TermiiError = require('../exception/TermiiError');

const sms = {};

/**
 * Validate and overwrite default SMS option
 *
 * @param {object} options
 * @returns this
 */
sms.setSMSOptions = function (options) {
    if (options) {
        let channel;

        if (utils.isObject(options)) {
            channel = utils.validateChannel(options.channel);
        } else {
            throw new TermiiError('Pass options as an object');
        }

        this.SMSOptions.channel = channel;
    }

    return this;
};

/**
 * Send SMS to numbers. The API accepts form-encoded request bodies,
 * returns JSON-encoded responses, and uses standard HTTP response codes.
 * more info: https://developer.termii.com/messaging
 *
 * @param {string || string[]} recipients
 * @param {string} message
 * @param {object} opts
 * @return {*} this._buildRequest
 */
sms.sendSMS = function (recipients, message, opts) {
    if (opts) {
        this.setSMSOptions(opts);
    }

    if (!utils.isStringOrArray(recipients)) {
        throw new TermiiError(
            'Phone numbers must be strings or arrays of numbers'
        );
    }

    if (!utils.isString(message)) {
        throw new TermiiError('SMS message must be a string');
    }

    const path = 'sms/send';

    const data = {
        to: recipients,
        from: this.SENDER_ID,
        sms: message,
        ...this.SMSOptions,
        api_key: this.API_KEY,

        /**
         * @Todo Implement sending media
         */
    };
    return this._buildRequest(path, 'POST', data, 'SMS');
};

module.exports = sms;
