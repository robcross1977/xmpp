"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const rxjs_1 = require("rxjs");
const events_1 = require("events");
const mucJoinHandler_1 = require("../../src/handlers/mucJoinHandler");
describe('The AnonRoomFactory class', () => {
    let anonRoomFactory;
    let clientStub;
    let uuidStub;
    let testRoom = 'testRoom';
    let testRoomFull = `${testRoom}@conference.murderbeard.com`;
    let testRoomJoined = `${testRoom}@conference.murderbeard.com-joined`;
    let testNick = 'admin';
    let testUuid = '0123456789';
    let uuidRoom = `${testUuid}@conference.murderbeard.com`;
    let uuidRoomJoined = `${testUuid}@conference.murderbeard.com-joined`;
    let configStub;
    const getAnonRoomFactory = (roomName) => {
        uuidStub = sinon.stub().returns(testUuid);
        class StanzaClient extends events_1.EventEmitter {
            constructor() {
                super(...arguments);
                this.joinRoom = sinon.stub().callsFake(() => { this.emit('muc:join', { from: { bare: `${roomName}@conference.murderbeard.com` } }); });
                this.configureRoom = sinon.spy();
                this.leaveRoom = sinon.spy();
            }
        }
        ;
        const Client = proxyquire('../../src/client', {
            'stanza.io': {
                createClient: sinon.stub().returns(new StanzaClient())
            }
        }).default;
        clientStub = new Client();
        clientStub.create({});
        clientStub.addHandler(new mucJoinHandler_1.default(clientStub));
        configStub = {
            createAnonRoomTimeout: 2000,
            createAnonRoomRetryCount: 3,
            defaultNick: 'daemon'
        };
        const AnonRoomFactory = proxyquire('../../src/muc/anonRoomFactory', {
            'uuid/v4': uuidStub,
            '../config': configStub
        }).default;
        return new AnonRoomFactory(clientStub);
    };
    beforeEach(() => {
        anonRoomFactory = getAnonRoomFactory(testUuid);
    });
    it('should exist', () => {
        // arrange
        // assert
        // act
        chai_1.expect(anonRoomFactory).to.exist;
    });
    describe('the client property', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(anonRoomFactory.client).to.exist;
        });
    });
    describe('the create method', () => {
        let observable;
        let nick = 'admin';
        beforeEach(() => {
            observable = anonRoomFactory.create(nick);
        });
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(anonRoomFactory.create).to.exist;
        });
        it('should assign a roomName if one isn\'t passed in', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.EMPTY);
            // act
            const createRoom$ = anonRoomFactory.create(testNick);
            const createRoomObserver = {
                next: (data) => {
                    chai_1.expect(uuidRoomJoined).to.equal(data);
                    done();
                }
            };
            createRoom$.subscribe(createRoomObserver);
            anonRoomFactory.configureRoom.restore();
        });
        it('should use the roomName passed in', (done) => {
            // arrange
            anonRoomFactory = getAnonRoomFactory(testRoom);
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.EMPTY);
            // act
            const createRoom$ = anonRoomFactory.create(testNick, testRoomFull);
            const createRoomObserver = {
                next: (data) => {
                    chai_1.expect(testRoomJoined).to.equal(data);
                    done();
                }
            };
            createRoom$.subscribe(createRoomObserver);
            anonRoomFactory.configureRoom.restore();
        });
        it('should create a custom room joined handler for our specific room we are making to alert people in the handler that we need to do something with this room', (done) => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.EMPTY);
            const createRoom$ = anonRoomFactory.create(testNick);
            const createRoomObserver = {
                next: (data) => {
                    chai_1.expect(anonRoomFactory.client.getHandler('0123456789@conference.murderbeard.com-joined').name).to.equal(data);
                    done();
                }
            };
            // act
            createRoom$.subscribe(createRoomObserver).first();
            anonRoomFactory.configureRoom.restore();
        });
        it('should concat joinedRoom followed by configureRoom in that order', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.EMPTY);
            sinon.stub(anonRoomFactory, '_createJoinedSpecificRoomHandler').returns(rxjs_1.EMPTY);
            const createRoom$ = anonRoomFactory.create(testNick);
            const createRoomObserver = {
                next: (data) => { },
                complete: () => {
                    chai_1.expect(anonRoomFactory.configureRoom.calledImmediatelyAfter(anonRoomFactory._createJoinedSpecificRoomHandler)).to.be.true;
                    done();
                }
            };
            // act
            createRoom$.subscribe(createRoomObserver);
            anonRoomFactory.configureRoom.restore();
            anonRoomFactory._createJoinedSpecificRoomHandler.restore();
        });
        it('should leave the room if an error occurs', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.throwError('error'));
            sinon.stub(anonRoomFactory, 'leaveRoom');
            const createRoom$ = anonRoomFactory.create(testNick);
            const createRoomObserver = {
                next: (data) => { },
                error: () => {
                    chai_1.expect(anonRoomFactory.leaveRoom.called).to.be.true;
                    done();
                }
            };
            // act
            createRoom$.subscribe(createRoomObserver);
            anonRoomFactory.configureRoom.restore();
            anonRoomFactory.leaveRoom.restore();
        });
        it('should remove the custom specific joined room handler if an error occurs', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.throwError('error'));
            sinon.spy(anonRoomFactory.client, 'removeHandler');
            const createRoom$ = anonRoomFactory.create(testNick);
            const createRoomObserver = {
                next: (data) => { },
                error: () => {
                    chai_1.expect(anonRoomFactory.client.removeHandler.calledWithExactly(uuidRoomJoined)).to.be.true;
                    done();
                }
            };
            // act
            createRoom$.subscribe(createRoomObserver);
            anonRoomFactory.configureRoom.restore();
            anonRoomFactory.client.removeHandler.restore();
        });
        it('should leave the room when complete', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.EMPTY);
            sinon.stub(anonRoomFactory, 'leaveRoom');
            const createRoom$ = anonRoomFactory.create(testNick);
            const createRoomObserver = {
                next: (data) => { },
                complete: () => {
                    chai_1.expect(anonRoomFactory.leaveRoom.calledWithExactly(uuidRoom, testNick)).to.be.true;
                    done();
                }
            };
            // act
            createRoom$.subscribe(createRoomObserver);
            anonRoomFactory.configureRoom.restore();
            anonRoomFactory.leaveRoom.restore();
        });
        it('should remove the custom specific joined room handler if the observerable completes', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.EMPTY);
            sinon.stub(anonRoomFactory.client, 'removeHandler');
            const createRoom$ = anonRoomFactory.create(testNick);
            const createRoomObserver = {
                next: (data) => { },
                complete: () => {
                    chai_1.expect(anonRoomFactory.client.removeHandler.calledWithExactly(uuidRoomJoined)).to.be.true;
                    done();
                }
            };
            // act
            createRoom$.subscribe(createRoomObserver);
            anonRoomFactory.configureRoom.restore();
            anonRoomFactory.client.removeHandler.restore();
        });
        it('should call joinRoom. In that handler (mucJoinHandler), it will emit our custom specific room joined event so that handler can take over', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(rxjs_1.EMPTY);
            sinon.spy(anonRoomFactory, 'joinRoom');
            const createRoom$ = anonRoomFactory.create(testNick);
            const createRoomObserver = {
                next: (data) => { },
                complete: () => {
                    chai_1.expect(anonRoomFactory.joinRoom.calledWithExactly(uuidRoom, testNick));
                    done();
                }
            };
            // act
            createRoom$.subscribe(createRoomObserver);
            anonRoomFactory.configureRoom.restore();
            anonRoomFactory.joinRoom.restore();
        });
    });
    describe('the joinRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(anonRoomFactory.joinRoom).to.exist;
        });
        it('should tell the underlying client to join the room', () => {
            // arrange
            sinon.spy(anonRoomFactory.client, 'joinRoom');
            // act
            anonRoomFactory.joinRoom(uuidRoom, testNick);
            // assert
            chai_1.expect(anonRoomFactory.client.joinRoom.calledWithExactly(uuidRoom, testNick)).to.be.true;
            anonRoomFactory.client.joinRoom.restore();
        });
    });
    describe('the configureRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(anonRoomFactory.configureRoom).to.exist;
        });
    });
    describe('the leaveRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(anonRoomFactory.leaveRoom).to.exist;
        });
        it('should have the underlying client call it\'s leaveRoom method', () => {
            // arrange
            sinon.stub(anonRoomFactory.client, 'leaveRoom').returns({});
            // act
            anonRoomFactory.leaveRoom(uuidRoom, testNick);
            // assert
            chai_1.expect(anonRoomFactory.client.leaveRoom.calledWithExactly(uuidRoom, testNick)).to.be.true;
            anonRoomFactory.client.leaveRoom.restore();
        });
    });
    describe('the destroyRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(anonRoomFactory.destroyRoom).to.exist;
        });
        it('should have the underlying client call it\'s destroyRoom method', () => {
            // arrange
            sinon.stub(anonRoomFactory.client, 'destroyRoom').returns({});
            // act
            anonRoomFactory.destroyRoom(uuidRoom);
            // assert
            chai_1.expect(anonRoomFactory.client.destroyRoom.calledWithExactly(uuidRoom)).to.be.true;
        });
    });
});
//# sourceMappingURL=anonRoomFactory.test.js.map