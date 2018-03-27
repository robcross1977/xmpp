"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anonRoomFactory_1 = require("./anonRoomFactory");
class Muc {
    constructor(client) {
        this.createAnonRoom = (nick, roomName) => this._anonRoomFactory.create(nick, roomName);
        this.destroyRoom = (roomName) => this._anonRoomFactory.destroyRoom(roomName);
        this._client = client;
        this._anonRoomFactory = new anonRoomFactory_1.default(this._client);
    }
}
exports.default = Muc;
//# sourceMappingURL=muc.js.map