"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
describe('The Muc class', () => {
    let muc;
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
        chai_1.expect(muc).to.exist;
    });
    describe('The createAnonRoom function', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(muc.createAnonRoom).to.exist;
        });
        it('should call anonRoomFactory.createAnonRoom', () => {
            // arrange
            const nick = 'testNick';
            const room = 'testRoom';
            // act
            muc.createAnonRoom(nick, room);
            // assert
            chai_1.expect(muc._anonRoomFactory.create.calledWithExactly(nick, room)).to.be.true;
        });
    });
    describe('The destroyRoom method', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(muc.destroyRoom).to.exist;
        });
        it('should call anonRoomFactory.destroyRoom', () => {
            // arrange
            const roomName = 'testRoom';
            // act
            muc.destroyRoom(roomName);
            // assert
            chai_1.expect(muc._anonRoomFactory.destroyRoom.calledWithExactly(roomName)).to.be.true;
        });
    });
});
//# sourceMappingURL=muc.test.js.map