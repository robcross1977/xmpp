import { expect } from 'chai';
import * as proxyquire from 'proxyquire';

describe('The Xmpp class', () => {
    let xmpp: any;

    beforeEach(() => {
        const Xmpp = proxyquire('../src/xmpp', {}).default;
        xmpp = new Xmpp();
    });

    it('should exist', () => {
        // arrange
        // act
        // assert
        expect(xmpp).to.exist;
    });

    describe('The client member', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(xmpp.client).to.exist;
        });
    });
});
