import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Handler from '../../src/handlers/handler';

describe('The JoinedSpecificRoomHandler class', () => {
    let handler: any;

    beforeEach(() => {
        const JoinedSpecificRoomHandler = proxyquire('../../src/handlers/joinedSpecificRoomHandler', {}).default;

        handler = new JoinedSpecificRoomHandler('testRoom');
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
        it('should be set to the string \'testRoom-joined\'', () => {
            // arrange
            // act
            // assert
            expect(handler.name).to.equal('testRoom-joined');
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

        it('should call complete on the subject when right after it calls next as it is one use only', () => {
            // arrange
            sinon.spy(handler.subject, 'next');
            sinon.spy(handler.subject, 'complete');
            // act
            handler.handler({});

            // assert
            expect(handler.subject.complete.calledImmediatelyAfter(handler.subject.next)).to.be.true;

            handler.subject.next.restore();
            handler.subject.complete.restore();
        });
    });
});