"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const handler_1 = require("../../src/handlers/handler");
describe('The JoinedSpecificRoomHandler class', () => {
    let handler;
    beforeEach(() => {
        const JoinedSpecificRoomHandler = proxyquire('../../src/handlers/joinedSpecificRoomHandler', {}).default;
        handler = new JoinedSpecificRoomHandler('testRoom');
        console.log(handler);
    });
    it('should exist', () => {
        // arrange
        // act
        // assert
        chai_1.expect(handler).to.exist;
    });
    it('should be a Handler type', () => {
        // arrange
        // act
        // assert
        chai_1.expect(handler instanceof handler_1.default).to.be.true;
    });
    describe('The name member', () => {
        it('should be set to the string \'testRoom-joined\'', () => {
            // arrange
            // act
            // assert
            chai_1.expect(handler.name).to.equal('testRoom-joined');
        });
    });
    describe('The handler method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(handler.handler).to.exist;
        });
        it('should call next on the subject when hit', () => {
            // arrange
            sinon.spy(handler.subject, 'next');
            // act
            handler.handler({});
            // assert
            chai_1.expect(handler.subject.next.calledWithExactly(handler.name)).to.be.true;
            handler.subject.next.restore();
        });
        it('should call complete on the subject when right after it calls next as it is one use only', () => {
            // arrange
            sinon.spy(handler.subject, 'next');
            sinon.spy(handler.subject, 'complete');
            // act
            handler.handler({});
            // assert
            chai_1.expect(handler.subject.complete.calledImmediatelyAfter(handler.subject.next)).to.be.true;
            handler.subject.next.restore();
            handler.subject.complete.restore();
        });
    });
});
//# sourceMappingURL=joinedSpecificRoomHandler.test.js.map