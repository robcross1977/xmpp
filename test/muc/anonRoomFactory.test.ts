import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import { Observable, EMPTY, throwError } from 'rxjs';
import { EventEmitter } from 'events';
import MucJoinHandler from '../../src/handlers/mucJoinHandler';

describe('The AnonRoomFactory class', () => {
    let anonRoomFactory: any;
    let clientStub: any;
    let uuidStub: any;
    let testRoom = 'testRoom';
    let testRoomFull = `${testRoom}@conference.murderbeard.com`;
    let testRoomJoined = `${testRoom}@conference.murderbeard.com-joined`;
    let testNick = 'admin';
    let testUuid = '0123456789'
    let uuidRoom = `${testUuid}@conference.murderbeard.com`;
    let uuidRoomJoined = `${testUuid}@conference.murderbeard.com-joined`;
    let configStub: any;

    const getAnonRoomFactory = (roomName: any) => {
        uuidStub = sinon.stub().returns(testUuid);

        class StanzaClient extends EventEmitter {
            joinRoom = sinon.stub().callsFake(() => { this.emit('muc:join', { from: { bare: `${roomName}@conference.murderbeard.com` }}) });
            configureRoom = sinon.spy();
            leaveRoom = sinon.spy();
        };

        const Client = proxyquire('../../src/client', {
            'stanza.io': {
                createClient: sinon.stub().returns(new StanzaClient())
            }            
        }).default;

        clientStub = new Client();
        clientStub.create({});
        clientStub.addHandler(new MucJoinHandler(clientStub));

        configStub = {
            createAnonRoomTimeout: 2000,
            createAnonRoomRetryCount: 3,
            defaultNick: 'daemon'
        };

        const AnonRoomFactory = proxyquire('../../src/muc/anonRoomFactory', {
            'uuid/v4': uuidStub,
            '../config': configStub
        }).default

        return new AnonRoomFactory(clientStub);
    };

    beforeEach(() => {
        anonRoomFactory = getAnonRoomFactory(testUuid);
    });

    it('should exist', () => {
        // arrange
        // assert
        // act
        expect(anonRoomFactory).to.exist;
    });

    describe('the client property', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(anonRoomFactory.client).to.exist;
        });
    });

    describe('the create method', () => {
        let observable: Observable<any>;
        let nick = 'admin';

        beforeEach(() => {
            observable = anonRoomFactory.create(nick);
        });

        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(anonRoomFactory.create).to.exist;
        });

        it('should assign a roomName if one isn\'t passed in', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(EMPTY);
            
            // act
            const createRoom$ = anonRoomFactory.create(testNick);

            const createRoomObserver = {
                next: (data: any) => {
                    expect(uuidRoomJoined).to.equal(data);
                    done();
                }
            };

            createRoom$.subscribe(createRoomObserver);

            anonRoomFactory.configureRoom.restore();
        });

        it('should use the roomName passed in', (done: Function) => {
            // arrange
            anonRoomFactory = getAnonRoomFactory(testRoom);
            
            sinon.stub(anonRoomFactory, 'configureRoom').returns(EMPTY);
            
            // act
            const createRoom$ = anonRoomFactory.create(testNick, testRoomFull);

            const createRoomObserver = {
                next: (data: any) => {
                    expect(testRoomJoined).to.equal(data);
                    done();
                }
            };

            createRoom$.subscribe(createRoomObserver);

            anonRoomFactory.configureRoom.restore();
        });

        it('should create a custom room joined handler for our specific room we are making to alert people in the handler that we need to do something with this room', (done: any) => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(EMPTY);
            
            const createRoom$ = anonRoomFactory.create(testNick);

            const createRoomObserver = {
                next: (data: any) => {
                    expect(anonRoomFactory.client.getHandler('0123456789@conference.murderbeard.com-joined').name).to.equal(data);
                    done();
                }
            };

            // act
            createRoom$.subscribe(createRoomObserver).first();

            anonRoomFactory.configureRoom.restore();
        });

        it('should concat joinedRoom followed by configureRoom in that order', done => {
            // arrange
            sinon.stub(anonRoomFactory, 'configureRoom').returns(EMPTY);
            sinon.stub(anonRoomFactory, '_createJoinedSpecificRoomHandler').returns(EMPTY);

            const createRoom$ = anonRoomFactory.create(testNick);

            const createRoomObserver = {
                next: (data: any) => {},
                complete: () => {
                    expect(anonRoomFactory.configureRoom.calledImmediatelyAfter(anonRoomFactory._createJoinedSpecificRoomHandler)).to.be.true;
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
            sinon.stub(anonRoomFactory, 'configureRoom').returns(throwError('error'));
            sinon.stub(anonRoomFactory, 'leaveRoom');

            const createRoom$ = anonRoomFactory.create(testNick);

            const createRoomObserver = {
                next: (data: any) => {},
                error: () => {
                    expect(anonRoomFactory.leaveRoom.called).to.be.true;
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
            sinon.stub(anonRoomFactory, 'configureRoom').returns(throwError('error'));
            sinon.spy(anonRoomFactory.client, 'removeHandler');

            const createRoom$ = anonRoomFactory.create(testNick);

            const createRoomObserver = {
                next: (data: any) => {},
                error: () => {
                    expect(anonRoomFactory.client.removeHandler.calledWithExactly(uuidRoomJoined)).to.be.true;
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
            sinon.stub(anonRoomFactory, 'configureRoom').returns(EMPTY);
            sinon.stub(anonRoomFactory, 'leaveRoom');

            const createRoom$ = anonRoomFactory.create(testNick);

            const createRoomObserver = {
                next: (data: any) => {},
                complete: () => {
                    expect(anonRoomFactory.leaveRoom.calledWithExactly(uuidRoom, testNick)).to.be.true;
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
            sinon.stub(anonRoomFactory, 'configureRoom').returns(EMPTY);
            sinon.stub(anonRoomFactory.client, 'removeHandler');

            const createRoom$ = anonRoomFactory.create(testNick);

            const createRoomObserver = {
                next: (data: any) => {},
                complete: () => {
                    expect(anonRoomFactory.client.removeHandler.calledWithExactly(uuidRoomJoined)).to.be.true;
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
            sinon.stub(anonRoomFactory, 'configureRoom').returns(EMPTY);
            sinon.spy(anonRoomFactory, 'joinRoom');

            const createRoom$ = anonRoomFactory.create(testNick);

            const createRoomObserver = {
                next: (data: any) => {},
                complete: () => {
                    expect(anonRoomFactory.joinRoom.calledWithExactly(uuidRoom, testNick));
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
            expect(anonRoomFactory.joinRoom).to.exist;
        });

        it('should tell the underlying client to join the room', () => {
            // arrange
            sinon.spy(anonRoomFactory.client, 'joinRoom');

            // act
            anonRoomFactory.joinRoom(uuidRoom, testNick);

            // assert
            expect(anonRoomFactory.client.joinRoom.calledWithExactly(uuidRoom, testNick)).to.be.true;
            
            anonRoomFactory.client.joinRoom.restore();
        });
    });

    describe('the configureRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(anonRoomFactory.configureRoom).to.exist;
        });
    });

    describe('the leaveRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(anonRoomFactory.leaveRoom).to.exist;
        });

        it('should have the underlying client call it\'s leaveRoom method', () => {
            // arrange
            sinon.stub(anonRoomFactory.client, 'leaveRoom').returns({});

            // act
            anonRoomFactory.leaveRoom(uuidRoom, testNick);

            // assert
            expect(anonRoomFactory.client.leaveRoom.calledWithExactly(uuidRoom, testNick)).to.be.true;

            anonRoomFactory.client.leaveRoom.restore();
        });
    });

    describe('the destroyRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(anonRoomFactory.destroyRoom).to.exist;
        });

        it('should have the underlying client call it\'s destroyRoom method', () => {
            // arrange
            sinon.stub(anonRoomFactory.client, 'destroyRoom').returns({});

            // act
            anonRoomFactory.destroyRoom(uuidRoom);

            // assert
            expect(anonRoomFactory.client.destroyRoom.calledWithExactly(uuidRoom)).to.be.true;
        });
    });
});