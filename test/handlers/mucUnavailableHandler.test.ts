import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Handler from '../../src/handlers/handler';
import Logger from '@murderbeard/logger';

describe('The MucUnavailableHandler class', () => {
    let handler: any;

    beforeEach(() => {
        const MucUnavailableHandler  = proxyquire('../../src/handlers/mucUnavailableHandler', {}).default;

        handler = new MucUnavailableHandler();
    });

    it('should exist', () => {
        // arrange
        // act
        // assert
        expect(handler).to.exist;
    });

    it('should be a Handler type', () => {
        // arrange
        // act
        // assert
        expect(handler instanceof Handler).to.be.true;
    });

    describe('The name member', () => {
        it('should be set to the string \'muc:unavilable\'', () => {
            // arrange
            // act
            // assert
            expect(handler.name).to.equal('muc:unavailable');
        });
    });

    describe('The handler method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(handler.handler).to.exist;
        });

        it('should call next on the subject when hit', () => {
            // arrange
            sinon.spy(handler.subject, 'next');

            // act
            handler.handler({});

            // assert
            expect(handler.subject.next.calledWithExactly(handler.name)).to.be.true;

            handler.subject.next.restore();
        });
    });
});