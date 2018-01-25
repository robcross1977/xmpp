import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Xmpp from '../src/xmpp';

describe('The Xmpp class', () => {
    let xmpp: any;

    beforeEach(() => {
        xmpp = new Xmpp();

        xmpp.client = {
            create: sinon.spy(),
            connect: sinon.spy(),
            addHandler: sinon.spy(),
            getHandler: sinon.spy(),
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
            expect(xmpp.client).to.exist;
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
            // act
            xmpp.create();

            // assert
            expect(xmpp.client.create.called).to.be.true;
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
            expect(xmpp.client.connect.called).to.be.true;
        });
    });
});
