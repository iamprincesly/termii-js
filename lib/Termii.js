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
    constructor(api_key, senderId = constants.SENDER_ID) {
        this.API_KEY = api_key;

        this.SENDER_ID = senderId;

        this.BASE_URI = constants.BASE_URI;
        this.SMS_TYPE = constants.SMS_TYPE;
        this.CHANNEL = constants.CHANNEL;
        this.REQUEST_TIMEOUT = constants.REQUEST_TIMEOUT;

        this.SMSOptions = { type: this.SMS_TYPE, channel: this.CHANNEL };

        Object.assign(this, sms);
    }

    _buildRequest(path, method, data) {
        const req = axios.create({
            baseURL: this.BASE_URI,
            timeout: this.REQUEST_TIMEOUT,
            headers: {
                'Content-Type': ['application/json', 'application/json'],
            },
            data: data || {},
        });

        return this._request(req, path, method);
    }

    _request(instance, endpoint, method) {
        return new Promise(async function (resolve, reject) {
            try {
                let response;

                if (method === 'POST') {
                    response = await instance.post(endpoint);
                } else if (method === 'GET') {
                    response = await instance.get(endpoint);
                }

                if (!response.data) {
                    reject(
                        new TermiiError(
                            'Something went wrong, request not send!'
                        )
                    );
                }

                resolve(response.data);
            } catch (err) {
                if (err.response) {
                    reject(
                        new TermiiError(
                            'Error making API call',
                            err.response.data
                        )
                    );
                } else if (err.request) {
                    reject(
                        new TermiiError('Error making API call', err.request)
                    );
                } else {
                    reject(
                        new TermiiError('Error making API call', err.message)
                    );
                }
            }
        });
    }
};
