import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Handler from '../../src/handlers/handler';

describe('The AuthSuccessHandler class', () => {
    let handler: any;

    beforeEach(() => {
        const AuthSuccessHandler = proxyquire('../../src/handlers/authSuccessHandler', {}).default;

        handler = new AuthSuccessHandler();
    });

    it('should exist', () => {
        // arrange
        // act
        // assert
        expect(handler).to.exist;
    });

    it('should be a Handler<T> type', () => {
        // arrange
        // act
        // assert
        expect(handler instanceof Handler).to.be.true;
    });

    describe('The name member', () => {
        it('should be set to the string \'auth:success\'', () => {
            // arrange
            // act
            // assert
            expect(handler.name).to.equal('auth:success');
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