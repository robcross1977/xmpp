import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import { EventEmitter } from 'events';
import ConnectionOptions from '../src/models/connectionOptions';
import { PassThrough } from 'stream';

describe('The Client class', async () => {
    let client: any;
    let stanzaIOStub: any;
    let connectOptions: ConnectionOptions;

    beforeEach(() => {
        connectOptions = {
            jid: 'test@test.com',
            password: 'password!',
            transport: 'websocket',
            wsURL: 'ws://murderbeard.com:5280/websocket'
        };

        stanzaIOStub = {
            createClient: sinon.stub().returns(new EventEmitter()),
            connect: sinon.spy(),
        }
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
        expect(client).to.exist;
    });
    
    describe('The create method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(client.create).to.exist;
        });

        it('should call stanzaIO.createClient', () => {
            // arrange
            // act
            client.create(connectOptions);

            // assert
            expect(stanzaIOStub.createClient.calledWithExactly(connectOptions)).to.be.true
        });
    });

    describe('The connect method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(client.connect).to.exist;
        });
    });

    describe('The disconnect method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(client.disconnect).to.exist;
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
            expect(client.addHandler).to.exist;
        });

        it('should add a handler if that handler hasn\'t been added yet', () => {
            // arrange
            const handler = {
                name: 'test',
                handler: () => {}
            };

            // act
            client.addHandler(handler);
            const storedHandler = client.getHandler(handler.name);

            // assert
            expect(storedHandler).to.equal(handler);
        });

        it('should check if a the handler has already been added before inserting over the old one when the session is started', () => {
            // arrange
            const original = {
                name: 'test',
                emit: 'theDifference',
                handler: () => {}
            }, attemptToOverWrite = {
                name: 'test',
                emit: 'isInTheEmit',
                handler: () => {}
            };

            // act
            try { // this will throw an error for sure
                client.addHandler(original);
                client.addHandler(attemptToOverWrite); // this one has same name and shouldn't overwrite
            } catch {
                // we don't really care what it is, we know it happens
            }
            
            const storedHandler = client.getHandler('test');

            // assert
            expect(storedHandler).to.equal(original);
        });

        it('should throw an exception if the handler already exists', done => {
            // arrange
            sinon.spy(client, 'addHandler');

            const handler = {
                name: 'test',
                emit: 'theDifference',
                handler: () => {}
            }, diffHandlerSameName = {
                name: 'test',
                emit: 'theDifference',
                handler: () => {}
            };

            // act
            client.addHandler(handler);

            try {
                client.addHandler(diffHandlerSameName);
            } catch(e) {
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
            expect(client.getHandler).to.exist;
        });

        it('should return the handler', () => {
            // arrange
            const handler = {
                name: 'test',
                handler: () => {}
            };

            // act
            client.addHandler(handler);

            const storedHandler = client.getHandler(handler.name);

            // assert
            expect(storedHandler).to.equal(handler);
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
            expect(client.removeHandler).to.exist;
        });

        it('should delete the handler if it is present', () => {
            // arrange
            const handler = {
                name: 'test',
                emit: 'testEmit',
                handler: () => {}
            };

            // act
            client.addHandler(handler);
            expect(client.getHandler(handler.name)).to.equal(handler);
            client.removeHandler(handler.name);

            // assert
            expect(client.getHandler(handler.name)).to.not.exist;
        });
    });
});
