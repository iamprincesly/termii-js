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
 * Set default SMS option
 */
sms.SMSOptions = { type: this.SMS_TYPE, channel: this.CHANNEL };


/**
 * Valid and and overwrite default SMS option
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
 * @param {string || string[]} receivers
 * @param {string} message
 * @param {object} opts
 * @return {*} this._buildRequest
 */
sms.sendSMS = function (receivers, message, opts) {
    if (opts) {
        this.setSMSOptions(opts);
    }

    const path = 'sms/send';

    const data = {
        to: receivers,
        from: this.SENDER_ID,
        sms: message,
        ...this.SMSOptions,
        api_key: this.API_KEY,

        /**
         * @Todo Implement sendind media
         */
        // media: {
        //     url: 'https://media.example.com/file',
        //     caption: 'your media file',
        // },
    };

    console.log(data);
    return this._buildRequest(path, data, 'POST');
};

module.exports = sms;
