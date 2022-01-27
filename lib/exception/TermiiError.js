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
 * Throw Termii exception when something goes wrong during API calls
 *
 * @class TermiiError
 * @extends {Error}
 */
class TermiiError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = TermiiError;