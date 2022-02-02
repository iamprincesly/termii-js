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
const Termii = require('../../lib/Termii');

/**
 * test the sendSMS method to be sure it return the needed data
 */
describe('Test sendSMS method', () => {
    const api_key =
        'TL0uKmj5R8Talloc2XWDAHbz5FNpWrnkRs93KlIH7lLN6whbO7MwruyOf8RUws';
    const senderId = 'jhsdvjhsc';

    const termii = new Termii(api_key, senderId);

    const recipients = ['2347065026902', '2347087675643'];

    it("should return object 200 status code and 'ok' code", async () => {
        const options = { channel: 'generic' };

        termii.setSMSOptions(options);

        const sms = await termii.sendSMS(recipients, 'Hello this is a message');

        expect(sms.code).toBe('ok');
    });

    it('it should throw an error for invalid channel', () => {
        const options = { channel: 'invalid' };
        expect(() => {
            termii.sendSMS('2347065526106', 'Hello this is a message', options);
        }).toThrowError();
    });

    it('Should throw an error if recipients are not string or array of numbers', () => {
        expect(() => {
            termii.sendSMS(2347065526106, 'Hello this is a message');
        }).toThrowError();
    });
});
