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

const axios = require('axios');
const TermiiError = require('./exception/TermiiError');
const sms = require('./apis/sms');
const constants = require('./helpers/constants');
/**
 * Main class
 *
 * @since 1.0
 * @class Termii
 */
module.exports = class Termii {
    /**
     * Creates an instance of Termii and set constants
     * @param {string} api_key
     * @param {string} [senderId=constants.SENDER_ID]
     */
    constructor(api_key, senderId = constants.SENDER_ID) {
        this.API_KEY = api_key;

        this.SENDER_ID = senderId;

        this.SMS_TYPE = constants.SMS_TYPE;

        this.BASE_URI = constants.BASE_URI;

        this.CHANNEL = constants.CHANNEL;

        this.REQUEST_TIMEOUT = constants.REQUEST_TIMEOUT;

        this.SMSOptions = { type: this.SMS_TYPE, channel: this.CHANNEL };

        Object.assign(this, sms);
    }

    /**
     * Bundle up request data and create client
     * @param {string} path
     * @param {string} method
     * @param {object} data
     * @return {function} this.#_request()
     */
    _buildRequest(path, method, data, msg) {
        const req = axios.create({
            baseURL: this.BASE_URI,
            timeout: this.REQUEST_TIMEOUT,
            headers: {
                'Content-Type': ['application/json', 'application/json'],
            },
            data: data || {},
        });

        return this.#_request(req, { path, method, data, msg });
    }

    /**
     * Make api call
     * @param {*} instance
     * @param {object} options
     * @return {promise}
     */
    #_request(instance, opts) {
        return new Promise(async function (resolve, reject) {
            try {
                let response;

                if (opts.method === 'POST') {
                    response = await instance.post(opts.path, opts.data);
                } else if (opts.method === 'GET') {
                    response = await instance.get(opts.path);
                }

                const returnObject = {
                    message: opts.msg + ' sent successfully.',
                    data: response.data,
                };

                resolve(returnObject);
            } catch (err) {
                if (err.response) {
                    reject(new TermiiError(err.response.data.message));
                } else {
                    reject(new TermiiError(err.message));
                }
            }
        });
    }
};
