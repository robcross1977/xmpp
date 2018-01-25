import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Handler from '../../src/handlers/handler';

describe('The MucErrorHandler class', () => {
    let handler: any;

    beforeEach(() => {
        const MucErrorHandler  = proxyquire('../../src/handlers/mucErrorHandler', {}).default;

        handler = new MucErrorHandler ();
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
        it('should be set to the string \'muc:error\'', () => {
            // arrange
            // act
            // assert
            expect(handler.name).to.equal('muc:error');
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