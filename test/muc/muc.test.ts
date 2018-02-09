import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import { EventEmitter } from 'events';
import Client from '../../src/client';
import { PassThrough } from 'stream';
import Logger from '@murderbeard/logger';

describe('The Muc class', () => {
    let muc: any;
    let clientStub: any;
    let uuidStub: any;
    let testRoom = 'testRoom@conference.murderbeard.com';

    beforeEach(() => {
        class Client  extends EventEmitter {
            constructor() {
                super();
            }

            public joinRoom = sinon.spy(() => {
                this.emit(`${testRoom}-joined`)
            });

            public configureRoom = sinon.stub().resolves();

            public leaveRoom = sinon.spy();

            public destroyRoom = sinon.spy();
        }

        class ClientStub extends Client {
            public sessionStarted = true;
            public client = new Client();
        }

        clientStub = new ClientStub();

        uuidStub = sinon.stub().returns('uuidHere');

        const Muc = proxyquire('../../src/muc/muc', {
            'uuid/v4': uuidStub
        }).default;

        muc = new Muc(clientStub, new Logger());
    });

    it('should exist', () => {
        // arrange
        // assert
        // act
        expect(muc).to.exist;
    });

    describe('The createPersistantAnonRoom method', () => {
        it('should exist',  () => {
            // arrange
            // act
            // assert
            expect(muc.createPersistantAnonRoom).to.exist;
        });

        it('should return a promise', () => {
            // arrange
            clientStub.sessionStarted = false;

            // act
            let prom = muc.createPersistantAnonRoom('admin', 'testRoom@conference.murderbeard.com');

            // assert
            expect(prom instanceof Promise).to.be.true;
        });

        it('should reject with an error message if the client session is not started', done => {
            // arrange
            clientStub.sessionStarted = false;

            // act
            muc.createPersistantAnonRoom('admin', 'testRoom@conference.murderbeard.com')
                .catch((err: any) => {
                    // assert
                    expect(err).to.equal('session not started');
                    done();
                });
        });

        it('should generate a roomName if one isn\'t provided', done => {
            // arrange
            sinon.stub(muc, 'generateRandomRoomName').returns(testRoom);
            sinon.stub(muc, 'configurePersistantAnonRoom').resolves();

            // act
            muc.createPersistantAnonRoom('admin')
                .then((data: any) => {
                    // assert
                    expect(muc.generateRandomRoomName.called).to.be.true;
                    done();

                    muc.generateRandomRoomName.restore();
                    muc.configurePersistantAnonRoom.restore();
                })
                .catch((error: any) => {
                    console.log(error)
                });
        });

        it('should call leaveRoom', done => {
            // arrange
            sinon.stub(muc, 'configurePersistantAnonRoom').resolves();
            sinon.spy(muc, 'leaveRoom');

            // act
            muc.createPersistantAnonRoom('admin', testRoom)
                .then((data: any) => {
                    // assert
                    expect(muc.leaveRoom.called).to.be.true;
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
                .then((data: any) => {
                    // assert
                    expect(clientStub.client.joinRoom.called).to.be.true;
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
            expect(muc.generateRandomRoomName).to.exist;
        });

        it('should call uuid', () => {
            // arrange
            // act
            muc.generateRandomRoomName();

            // assert
            expect(uuidStub.called).to.be.true;
        });

        it('should concat the default value of \'@conference.murderbeard.com\' as the host if mucDomain isn\'t passed in', () => {
            // arrange
            // act
            const retVal = muc.generateRandomRoomName();

            // assert
            expect(retVal.includes('@conference.murderbeard.com')).to.be.true;
        });

        it('should use the passed in mucdomain to concat to the uuid if it is passed in', () => {
            // arrange
            // act
            const retVal = muc.generateRandomRoomName('@conference.otherplace.com');

            // assert
            expect(retVal.includes('@conference.otherplace.com')).to.be.true;
        });
    });

    describe('The configurePersistantAnonRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(muc.configurePersistantAnonRoom).to.exist;
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
            expect(muc.leaveRoom).to.exist;
        });

        it('should call the underlying client leaveRoom message', () => {
            // arrange
            // act
            muc.leaveRoom(testRoom, 'admin');

            // assert
            expect(clientStub.client.leaveRoom.calledWithExactly(testRoom, 'admin')).to.be.true;
        });
    });

    describe('The destroyRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(muc.destroyRoom).to.exist;
        });

        it('should call the underlying client\'s destroyRoom method', () => {
            // arrange
            // act
            muc.destroyRoom(testRoom);

            // assert
            expect(clientStub.client.destroyRoom.calledWithMatch(testRoom)).to.be.true;
        });
    })
});