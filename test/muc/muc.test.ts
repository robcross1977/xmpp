import { expect } from 'chai';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import Logger from '@murderbeard/logger';

describe('The Muc class', () => {
    let muc: any;
    let testRoom = 'testRoom@conference.murderbeard.com';

    beforeEach(() => {
        const Muc = proxyquire('../../src/muc/muc', {}).default;

        muc = new Muc({});
        muc._anonRoomFactory = sinon.stub(muc._anonRoomFactory);
    });

    it('should exist', () => {
        // arrange
        // assert
        // act
        expect(muc).to.exist;
    });

    describe('The createAnonRoom function', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(muc.createAnonRoom).to.exist;
        });

        it('should call anonRoomFactory.createAnonRoom', () => {
            // arrange
            const nick = 'testNick';
            const room = 'testRoom';

            // act
            muc.createAnonRoom(nick, room);

            // assert
            expect(muc._anonRoomFactory.create.calledWithExactly(nick, room)).to.be.true;
        });
    });

    describe('The destroyRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(muc.destroyRoom).to.exist;
        });

        it('should call anonRoomFactory.destroyRoom', () => {
            // arrange
            const roomName = 'testRoom';

            // act
            muc.destroyRoom(roomName);

            // assert
            expect(muc._anonRoomFactory.destroyRoom.calledWithExactly(roomName)).to.be.true;
        });
    });
});