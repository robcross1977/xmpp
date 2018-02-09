"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const handler_1 = require("../../src/handlers/handler");
const logger_1 = require("@murderbeard/logger");
describe('The MucJoinHandler class', () => {
    let handler;
    let _xmppClientStub;
    beforeEach(() => {
        _xmppClientStub = {
            client: {
                emit: sinon.spy()
            }
        };
    });
    beforeEach(() => {
        const MucJoinHandler = proxyquire('../../src/handlers/mucJoinHandler', {
            '../client': _xmppClientStub
        }).default;
        handler = new MucJoinHandler(_xmppClientStub, new logger_1.default());
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
        it('should be set to the string \'muc:join\'', () => {
            // arrange
            // act
            // assert
            chai_1.expect(handler.name).to.equal('muc:join');
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
            handler.handler({
                from: {
                    bare: 'tester@conference.murderbeard.com'
                }
            });
            // assert
            chai_1.expect(handler.subject.next.calledWithExactly(handler.name)).to.be.true;
            handler.subject.next.restore();
        });
        it('should call _xmppClient.client.emit with the bare data concatenated to -joined', () => {
            // arrange
            const data = {
                from: {
                    bare: 'tester@conference.murderbeard.com'
                }
            };
            // act
            handler.handler(data);
            // assert
            chai_1.expect(_xmppClientStub.client.emit.calledWithExactly(`${data.from.bare}-joined`)).to.be.true;
        });
    });
});
//# sourceMappingURL=mucJoinHandler.test.js.map