import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Handler from '../../src/handlers/handler';

describe('The MucAvailableHandler class', () => {
    let handler: any;

    beforeEach(() => {
        const MucAvailableHandler = proxyquire('../../src/handlers/mucAvailableHandler', {}).default;

        handler = new MucAvailableHandler();
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
        it('should be set to the string \'muc:available\'', () => {
            // arrange
            // act
            // assert
            expect(handler.name).to.equal('muc:available');
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
            expect(handler.subject.next.calledWithExactly('muc:available')).to.be.true;

            handler.subject.next.restore();
        });
    });
});