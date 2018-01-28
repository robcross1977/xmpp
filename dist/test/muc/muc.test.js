"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const events_1 = require("events");
describe('The Muc class', () => {
    let muc;
    let clientStub;
    let uuidStub;
    let testRoom = 'testRoom@conference.murderbeard.com';
    beforeEach(() => {
        class Client extends events_1.EventEmitter {
            constructor() {
                super();
                this.joinRoom = sinon.spy(() => {
                    this.emit(`${testRoom}-joined`);
                });
                this.configureRoom = sinon.stub().resolves();
                this.leaveRoom = sinon.spy();
                this.destroyRoom = sinon.spy();
            }
        }
        class ClientStub extends Client {
            constructor() {
                super(...arguments);
                this.sessionStarted = true;
                this.client = new Client();
            }
        }
        clientStub = new ClientStub();
        uuidStub = sinon.stub().returns('uuidHere');
        const Muc = proxyquire('../../src/muc/muc', {
            'uuid/v4': uuidStub
        }).default;
        muc = new Muc(clientStub);
    });
    it('should exist', () => {
        // arrange
        // assert
        // act
        chai_1.expect(muc).to.exist;
    });
    describe('The createPersistantAnonRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(muc.createPersistantAnonRoom).to.exist;
        });
        it('should return a promise', () => {
            // arrange
            clientStub.sessionStarted = false;
            // act
            let prom = muc.createPersistantAnonRoom('admin', 'testRoom@conference.murderbeard.com');
            // assert
            chai_1.expect(prom instanceof Promise).to.be.true;
        });
        it('should reject with an error message if the client session is not started', done => {
            // arrange
            clientStub.sessionStarted = false;
            // act
            muc.createPersistantAnonRoom('admin', 'testRoom@conference.murderbeard.com')
                .catch((err) => {
                // assert
                chai_1.expect(err).to.equal('session not started');
                done();
            });
        });
        it('should generate a roomName if one isn\'t provided', done => {
            // arrange
            sinon.stub(muc, 'generateRandomRoomName').returns(testRoom);
            sinon.stub(muc, 'configurePersistantAnonRoom').resolves();
            // act
            muc.createPersistantAnonRoom('admin')
                .then((data) => {
                // assert
                chai_1.expect(muc.generateRandomRoomName.called).to.be.true;
                done();
                muc.generateRandomRoomName.restore();
                muc.configurePersistantAnonRoom.restore();
            });
        });
        it('should call leaveRoom', done => {
            // arrange
            sinon.stub(muc, 'configurePersistantAnonRoom').resolves();
            sinon.spy(muc, 'leaveRoom');
            // act
            muc.createPersistantAnonRoom('admin', testRoom)
                .then((data) => {
                // assert
                chai_1.expect(muc.leaveRoom.called).to.be.true;
                done();
                muc.configurePersistantAnonRoom.restore();
                muc.leaveRoom.restore();
            });
        });
        it('should call joinRoom', done => {
            // arrange
            sinon.stub(muc, 'configurePersistantAnonRoom').resolves();
            // act
            muc.createPersistantAnonRoom('admin', testRoom)
                .then((data) => {
                // assert
                chai_1.expect(clientStub.client.joinRoom.called).to.be.true;
                done();
                muc.configurePersistantAnonRoom.restore();
            });
        });
    });
    describe('The generateRandomRoomName method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(muc.generateRandomRoomName).to.exist;
        });
        it('should call uuid', () => {
            // arrange
            // act
            muc.generateRandomRoomName();
            // assert
            chai_1.expect(uuidStub.called).to.be.true;
        });
        it('should concat the default value of \'@conference.murderbeard.com\' as the host if mucDomain isn\'t passed in', () => {
            // arrange
            // act
            const retVal = muc.generateRandomRoomName();
            // assert
            chai_1.expect(retVal.includes('@conference.murderbeard.com')).to.be.true;
        });
        it('should use the passed in mucdomain to concat to the uuid if it is passed in', () => {
            // arrange
            // act
            const retVal = muc.generateRandomRoomName('@conference.otherplace.com');
            // assert
            chai_1.expect(retVal.includes('@conference.otherplace.com')).to.be.true;
        });
    });
    describe('The configurePersistantAnonRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(muc.configurePersistantAnonRoom).to.exist;
        });
        it('should reject if an error occurs during the call to configureRoom', () => {
            // arrange
            // act
            // assert
        });
        it('should resolve with the roomName if the call to configureRoom is successful', () => {
            // arrange
            // act
            // assert
        });
    });
    describe('The leaveRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(muc.leaveRoom).to.exist;
        });
        it('should call the underlying client leaveRoom message', () => {
            // arrange
            // act
            muc.leaveRoom(testRoom, 'admin');
            // assert
            chai_1.expect(clientStub.client.leaveRoom.calledWithExactly(testRoom, 'admin')).to.be.true;
        });
    });
    describe('The destroyRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(muc.destroyRoom).to.exist;
        });
        it('should call the underlying client\'s destroyRoom method', () => {
            // arrange
            // act
            muc.destroyRoom(testRoom);
            // assert
            chai_1.expect(clientStub.client.destroyRoom.calledWithMatch(testRoom)).to.be.true;
        });
    });
});
//# sourceMappingURL=muc.test.js.map