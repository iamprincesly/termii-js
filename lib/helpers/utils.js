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
 * Check if parameter is an array
 *
 * @param {*} array
 * @returns {boolean}
 */
function isArray(array) {
    return Array.isArray(array);
}

// Export functions
module.exports = {
    isString,
    isEmptyString,
    isDate,
    isObject,
    isNumber,
    isValidNumberLength,
    isArray,
};
