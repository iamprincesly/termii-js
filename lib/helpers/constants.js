/**
 * @description The base URI for the Termii API
 * @type constant
 */
const BASE_URI = 'https://api.ng.termii.com/api';

/**
 * @description The host of the Termii API
 * @type constant
 */
const HOST = 'termii.com';

/**
 * @description Termii default Sender ID to send sms and token
 * @type constant
 */
const SENDER_ID = 'Termii';

/**
 * @description Termii default channel to send sms and token
 * @type constant
 */
const CHANNEL = 'generic';

/**
 * @description Termii OTP default attempts
 * @type constant
 */
const PIN_ATTEMPTS = 5;

/**
 * @description Termii OTP default time to live
 * @type constant
 */
const PIN_TIME_TO_LIVE = 5;

/**
 * @description Termii OTP default length
 * @type constant
 */
const PIN_LENGTH = 4;

/**
 * @description Termii OTP default placeholder
 * @type constant
 */
const PIN_PLACEHOLDER = '< 123 >';

/**
 * @description The default sms type used by the Termii
 * @type constant
 */
const SMS_TYPE = 'plain';

/**
 * @description Termii default OTP type
 * @type constant
 */
const PIN_TYPE = 'NUMERIC';

/**
 * @description Termii default message type
 * @type constant
 */
const MESSAGE_TYPE = 'ALPHANUMERIC';

/**
 * @description Termii default request timeout
 * @type constant
 */
const REQUEST_TIMEOUT = 30000;

/**
 * Export contants
 */
module.exports = {
    BASE_URI,
    HOST,
    SENDER_ID,
    CHANNEL,
    PIN_ATTEMPTS,
    PIN_TIME_TO_LIVE,
    PIN_LENGTH,
    PIN_PLACEHOLDER,
    SMS_TYPE,
    PIN_TYPE,
    MESSAGE_TYPE,
    REQUEST_TIMEOUT,
};
