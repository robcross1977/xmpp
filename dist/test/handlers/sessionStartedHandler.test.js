"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const handler_1 = require("../../src/handlers/handler");
const logger_1 = require("@murderbeard/logger");
describe('The SessionStartedHandler class', () => {
    let handler;
    beforeEach(() => {
        const SessionStartedHandler = proxyquire('../../src/handlers/sessionStartedHandler', {}).default;
        handler = new SessionStartedHandler(new logger_1.default());
    });
    it('should exist', () => {
        // arrange
        // act
        // assert
        chai_1.expect(handler).to.exist;
    });
    it('should be a Handler<T> type', () => {
        // arrange
        // act
        // assert
        chai_1.expect(handler instanceof handler_1.default).to.be.true;
    });
    describe('The name member', () => {
        it('should be set to the string \'session:started\'', () => {
            // arrange
            // act
            // assert
            chai_1.expect(handler.name).to.equal('session:started');
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
    });
});
//# sourceMappingURL=sessionStartedHandler.test.js.map