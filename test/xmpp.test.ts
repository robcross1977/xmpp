import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Xmpp from '../src/xmpp';
import ConnectionOptions from '../src/models/connectionOptions';
import Handler from '../src/handlers/Handler';

describe('The Xmpp class', () => {
    let xmpp: any;
    let handler: Handler<string>;

    beforeEach(() => {
        handler = new Handler<string>();

        xmpp = new Xmpp();

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
        expect(xmpp).to.exist;
    });

    describe('The client member', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(xmpp._client).to.exist;
        });
    });

    describe('The create method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(xmpp.create).to.exist;
        });

        it('should call xmpp.client.create with the options passed in', () => {
            // arrange
            const opts = {
                jid: 'test@murderbeard.com',
                password: 'password!',
                transport: 'websocket',
                wsURL: 'ws://fake.murderbeard.com:5280/websocket'
            } as ConnectionOptions;

            // act
            xmpp.create(opts);

            // assert
            expect(xmpp._client.create.calledWithExactly(opts)).to.be.true;
        }); 
    });

    describe('The connect method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(xmpp.connect).to.exist;
        });
        
        it('should call xmpp.client.connect', () => {
            // arrange
            // act
            xmpp.create(); // have to create to connect
            xmpp.connect();

            // assert
            expect(xmpp._client.connect.called).to.be.true;
        });
    });

    describe('The disconnect method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(xmpp.disconnect).to.exist;
        });
    });

    describe('The subscribe method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(xmpp.subscribe).to.exist;
        });

        it('should return a handlers subject by name', () => {
            // arrange
            // act
            xmpp.addHandler(handler);
            const storedHandler = xmpp.subscribe(handler.name);

            // assert
            expect(storedHandler).to.equal(handler.subject);
        });
    });

    describe('The addHandler method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(xmpp.addHandler).to.exist;
        });

        it('should call client.addHandler with the handler passed in', () => {
            // arrange
            const handler = new Handler<string>();


            // act
            xmpp.addHandler(handler);


            // assert
            expect(xmpp._client.addHandler.calledWithExactly(handler)).to.be.true;
        });
    });

    describe('The removeHandler method', () => {
        it('should exist', () => {
            // arrange
            // assert
            // act
            expect(xmpp.removeHandler).to.exist;
        });

        it('should call xmpp.client.removeHandler with the name passed in', () => {
            // arrange
            // act
            xmpp.removeHandler(handler.name);

            // assert
            expect(xmpp._client.removeHandler.calledWithExactly(handler.name)).to.be.true;
        });
    });
});
