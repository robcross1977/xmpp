"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const events_1 = require("events");
describe('The Client class', () => __awaiter(this, void 0, void 0, function* () {
    let client;
    let stanzaIOStub;
    let connectOptions;
    beforeEach(() => {
        connectOptions = {
            jid: 'test@test.com',
            password: 'password!',
            transport: 'websocket',
            wsURL: 'ws://murderbeard.com:5280/websocket'
        };
        stanzaIOStub = {
            createClient: sinon.stub().returns(new events_1.EventEmitter()),
            connect: sinon.spy(),
        };
    });
    // Set up the main module
    beforeEach(() => {
        const Client = proxyquire('../src/client', {
            'stanza.io': stanzaIOStub
        }).default;
        client = new Client();
    });
    it('should exist', () => {
        // arrange
        // act
        // assert
        chai_1.expect(client).to.exist;
    });
    describe('The sesionStarted member', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(client.sessionStarted).to.exist;
        });
        it('should be initially set to false', () => {
            // arrange
            // act
            // assert
            chai_1.expect(client.sessionStarted).to.be.false;
        });
    });
    describe('The create method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(client.create).to.exist;
        });
        it('should call stanzaIO.createClient', () => {
            // arrange
            // act
            client.create(connectOptions);
            // assert
            chai_1.expect(stanzaIOStub.createClient.calledWithExactly(connectOptions)).to.be.true;
        });
    });
    describe('The connect method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(client.connect).to.exist;
        });
    });
    describe('The disconnect method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(client.disconnect).to.exist;
        });
    });
    describe('The addHandler method', () => {
        beforeEach(() => {
            client.create(connectOptions); // this won't work unless the client is created
        });
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(client.addHandler).to.exist;
        });
        it('should add a handler if that handler hasn\'t been added yet', () => {
            // arrange
            const handler = {
                name: 'test',
                handler: () => { }
            };
            // act
            client.addHandler(handler);
            const storedHandler = client.getHandler(handler.name);
            // assert
            chai_1.expect(storedHandler).to.equal(handler);
        });
        it('should check if a the handler has already been added before inserting over the old one when the session is started', () => {
            // arrange
            const original = {
                name: 'test',
                emit: 'theDifference',
                handler: () => { }
            }, attemptToOverWrite = {
                name: 'test',
                emit: 'isInTheEmit',
                handler: () => { }
            };
            // act
            try {
                client.addHandler(original);
                client.addHandler(attemptToOverWrite); // this one has same name and shouldn't overwrite
            }
            catch (_a) {
                // we don't really care what it is, we know it happens
            }
            const storedHandler = client.getHandler('test');
            // assert
            chai_1.expect(storedHandler).to.equal(original);
        });
        it('should throw an exception if the handler already exists', done => {
            // arrange
            sinon.spy(client, 'addHandler');
            const handler = {
                name: 'test',
                emit: 'theDifference',
                handler: () => { }
            }, diffHandlerSameName = {
                name: 'test',
                emit: 'theDifference',
                handler: () => { }
            };
            // act
            client.addHandler(handler);
            try {
                client.addHandler(diffHandlerSameName);
            }
            catch (e) {
                // assert
                done();
                client.addHandler.restore();
            }
        });
    });
    describe('The getHandler method', () => {
        beforeEach(() => {
            client.create(connectOptions); // this won't work unless the client is created
        });
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(client.getHandler).to.exist;
        });
        it('should return the handler', () => {
            // arrange
            const handler = {
                name: 'test',
                handler: () => { }
            };
            // act
            client.addHandler(handler);
            const storedHandler = client.getHandler(handler.name);
            // assert
            chai_1.expect(storedHandler).to.equal(handler);
        });
    });
    describe('The removeHandler method', () => {
        beforeEach(() => {
            client.create(connectOptions); // this won't work unless the client is created
        });
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(client.removeHandler).to.exist;
        });
        it('should delete the handler if it is present', () => {
            // arrange
            const handler = {
                name: 'test',
                emit: 'testEmit',
                handler: () => { }
            };
            // act
            client.addHandler(handler);
            chai_1.expect(client.getHandler(handler.name)).to.equal(handler);
            client.removeHandler(handler.name);
            // assert
            chai_1.expect(client.getHandler(handler.name)).to.not.exist;
        });
    });
}));
//# sourceMappingURL=client.test.js.map