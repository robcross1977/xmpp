import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Handler from '../../src/handlers/handler';
import Client from '../../src/client';

describe('The MucJoinHandler class', () => {
    let handler: any;
    let _xmppClientStub: any;

    beforeEach(() => {
        _xmppClientStub = {
            client: {
                emit: sinon.spy()
            }
        }
    });

    beforeEach(() => {
        const MucJoinHandler  = proxyquire('../../src/handlers/mucJoinHandler', {
            '../client': _xmppClientStub
        }).default;

        handler = new MucJoinHandler(_xmppClientStub as Client);
    });

    it('should exist', () => {
        // arrange
        // act
        // assert
        expect(handler).to.exist;
    });

    it('should be a Handler type', () => {
        // arrange
        // act
        // assert
        expect(handler instanceof Handler).to.be.true;
    });

    describe('The name member', () => {
        it('should be set to the string \'muc:join\'', () => {
            // arrange
            // act
            // assert
            expect(handler.name).to.equal('muc:join');
        });
    });

    describe('The handler method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(handler.handler).to.exist;
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
            expect(handler.subject.next.calledWithExactly(handler.name)).to.be.true;

            handler.subject.next.restore();
        });

        it('should call _xmppClient.client.emit with the bare data concatenated to -joined', () => {
            // arrange
            const data = {
                from: {
                    bare: 'tester@conference.murderbeard.com'
                }
            }
            // act
            handler.handler(data);

            // assert
            expect(_xmppClientStub.client.emit.calledWithExactly(`${data.from.bare}-joined`)).to.be.true;
        });
    });
});