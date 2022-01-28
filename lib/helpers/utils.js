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

const TermiiError = require('../exception/TermiiError');

/**
 * Check if a param is a string
 *
 * @param {*} val
 * @returns {boolean}
 */
function isString(val) {
    return typeof val === 'string' || val instanceof String;
}

/**
 * Check if string is valid and if it empty
 *
 * @param {*} string
 * @returns {boolean}
 */
function isEmptyString(string) {
    if (!isString(string)) return false;
    return string.length < 1;
}

/**
 * Check if parameter is a valid date
 *
 * @param {*} date
 * @returns {boolean}
 */
function isDate(date) {
    if (isString(date) || isArray(date) || date == undefined || date == null)
        return false;
    return (
        date &&
        Object.prototype.toString.call(date) === '[object Date]' &&
        !isNaN(date)
    );
}

/**
 * Check if parameter is an array
 *
 * @param {*} array
 * @returns {boolean}
 */
function isArray(array) {
    return Array.isArray(array);
}

/**
 * Check if parameter is an object
 *
 * @param {*} object
 * @returns {boolean}
 */
function isObject(object) {
    if (isArray(object) || isDate(object)) return false;
    return object !== null && typeof object === 'object';
}

/**
 * Check if parameter is a valid string or array
 *
 * @param {*} val
 * @returns {boolean}
 */
function isStringOrArray(val) {
    if (isArray(val) || isString(val)) return true;
    return false;
}

/**
 * Check if parameter is a number
 *
 * @param {*} number
 * @returns {boolean}
 */
function isNumber(number) {
    return !isNaN(number) && !isNaN(parseInt(number));
}

/**
 * Check if number is between min and max
 *
 * @param {*} number
 * @param {*} min
 * @param {*} max
 * @returns {boolean}
 */
function isValidNumberLength(number, min, max) {
    if (!isNumber(number) || !isNumber(min) || !isNumber(max)) return false;
    return number >= min && number <= max;
}

/**
 * Check if OTP pin_time_to_live is between 0 and 60
 *
 * @param {*} pin_time_to_live
 * @returns pin_time_to_live
 */
function validatePinTimeToLive(pin_time_to_live) {
    if (
        !isNumber(pin_time_to_live) ||
        !isValidNumberLength(pin_time_to_live, 0, 60)
    ) {
        throw new TermiiError("'time_to_live' must be between 0 and 60");
    }

    return pin_time_to_live;
}

/**
 * Check if OPT pin_length is between 4 and 8
 *
 * @param {*} pin_length
 * @returns pin_length
 */
function validatePinLength(pin_length) {
    if (!isNumber(pin_length) || !isValidNumberLength(pin_length, 4, 8)) {
        throw new TermiiError("'pin_length' must be between 4 and 8");
    }

    return pin_length;
}

/**
 * Check if OPT pin_type or message_type is
 * either 'NUMERIC' or 'ALPHANUMERIC'
 *
 * @param {*} type
 * @returns type
 */
function validatePinAndMessageType(type) {
    const validType = ['NUMERIC', 'ALPHANUMERIC'];

    if (isEmptyString(type) || !validType.includes(upperCase(type))) {
        throw new TermiiError(
            "'message_type' or 'pin_type' must be either 'NUMERIC' or 'ALPHANUMERIC'"
        );
    }

    return upperCase(type);
}

/**
 * Check if channel is either 'dnd', 'WhatsApp' or 'generic'
 *
 * @param {*} channel
 * @returns channel
 */
function validateChannel(channel) {
    const validChannel = ['dnd', 'WhatsApp', 'generic'];

    if (isEmptyString(channel) || !validChannel.includes(channel)) {
        throw new TermiiError(
            "'channel' must be either 'dnd', 'WhatsApp' or 'generic'"
        );
    }

    return channel;
}

// Export functions
module.exports = {
    isString,
    isEmptyString,
    isDate,
    isArray,
    isObject,
    isStringOrArray,
    isNumber,
    isValidNumberLength,
    validatePinTimeToLive,
    validatePinLength,
    validatePinAndMessageType,
    validateChannel,
};
