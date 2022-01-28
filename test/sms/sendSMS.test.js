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
    const api_key = 'somesrtinghere';
    const senderId = 'Prince Sly';

    const termii = new Termii(api_key, senderId);

    const recipients = ['2347065026902', '2347087675643'];

    const data = {
        to: recipients,
        from: 'Prince Sly',
        sms: 'Hello this is a message',
        type: 'plain',
        channel: 'dnd',
        api_key: 'somesrtinghere',
    };

    it('should return object containing the payload', () => {
        const options = { channel: 'dnd' };

        termii.setSMSOptions(options);

        const sms = termii.sendSMS(recipients, 'Hello this is a message');

        expect(sms).toEqual(data);
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
