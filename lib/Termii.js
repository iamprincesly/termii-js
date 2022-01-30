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
 * Represents an API call.
 * Ship your node.js app faster by using this SDKs 
 *
 * @class Termii
 */
module.exports = class Termii {
    /**
     * Creates an instance of Termii and set constants.
     * You can specify the API key and the sender ID in the environment
     * variable 'TERMII_API_KEY' and 'TERMII_SENDER_ID' then create a new instance
     * without passing the constructor arguments.
     *
     * NOTE: If you don't specify sender ID in the environment variable 'TERMII_SENDER_ID'
     * you will have to pass it to the constructor as second argument else 'Termii' will be used
     * as a default sender ID. API key is made mandatory, you specify it in the environment
     * variable 'TERMII_API_KEY' or pass to the constructor
     * @param {string} [api_key=contants.API_KEY]
     * @param {string} [sender_id=constants.SENDER_ID]
     */
    constructor(api_key = constants.API_KEY, sender_id = constants.SENDER_ID) {
        this.API_KEY = api_key;

        if (!this.API_KEY) {
            throw new TermiiError('Please provide a valid Termii API key');
        }

        this.SENDER_ID = sender_id;

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
     * Making a request to Termii API may return
     * 'Unauthorized' message. This simply means that your API is invalid
     * 
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
