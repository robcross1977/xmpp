"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const xmpp_1 = require("../src/xmpp");
const Handler_1 = require("../src/handlers/Handler");
describe('The Xmpp class', () => {
    let xmpp;
    let handler;
    let logger;
    beforeEach(() => {
        handler = new Handler_1.default();
        xmpp = new xmpp_1.default();
        xmpp._client = {
            create: sinon.spy(),
            connect: sinon.spy(),
            addHandler: sinon.spy(),
            getHandler: sinon.stub().returns(handler),
            removeHandler: sinon.spy()
        };
    });
    it('should exist', () => {
        // arrange
        // act
        // assert
        chai_1.expect(xmpp).to.exist;
    });
    describe('The client member', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(xmpp._client).to.exist;
        });
    });
    describe('The muc property', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(xmpp.muc).to.exist;
        });
    });
    describe('The create method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(xmpp.create).to.exist;
        });
        it('should call xmpp.client.create with the options passed in', () => {
            // arrange
            const opts = {
                jid: 'test@murderbeard.com',
                password: 'password!',
                transport: 'websocket',
                wsURL: 'ws://fake.murderbeard.com:5280/websocket'
            };
            // act
            xmpp.create(opts);
            // assert
            chai_1.expect(xmpp._client.create.calledWithExactly(opts)).to.be.true;
        });
    });
    describe('The connect method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(xmpp.connect).to.exist;
        });
        it('should call xmpp.client.connect', () => {
            // arrange
            // act
            xmpp.create(); // have to create to connect
            xmpp.connect();
            // assert
            chai_1.expect(xmpp._client.connect.called).to.be.true;
        });
    });
    describe('The disconnect method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(xmpp.disconnect).to.exist;
        });
    });
    describe('The subject method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(xmpp.subject).to.exist;
        });
        it('should return a handlers subject by name', () => {
            // arrange
            // act
            xmpp.addHandler(handler);
            const storedHandler = xmpp.subject(handler.name);
            // assert
            chai_1.expect(storedHandler).to.equal(handler.subject);
        });
    });
    describe('The addHandler method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(xmpp.addHandler).to.exist;
        });
        it('should call client.addHandler with the handler passed in', () => {
            // arrange
            const handler = new Handler_1.default();
            // act
            xmpp.addHandler(handler);
            // assert
            chai_1.expect(xmpp._client.addHandler.calledWithExactly(handler)).to.be.true;
        });
    });
    describe('The removeHandler method', () => {
        it('should exist', () => {
            // arrange
            // assert
            // act
            chai_1.expect(xmpp.removeHandler).to.exist;
        });
        it('should call xmpp.client.removeHandler with the name passed in', () => {
            // arrange
            // act
            xmpp.removeHandler(handler.name);
            // assert
            chai_1.expect(xmpp._client.removeHandler.calledWithExactly(handler.name)).to.be.true;
        });
    });
});
//# sourceMappingURL=xmpp.test.js.map