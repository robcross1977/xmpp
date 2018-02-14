"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anonRoomFactory_1 = require("./anonRoomFactory");
const Observable_1 = require("rxjs/Observable");
const fromPromise_1 = require("rxjs/observable/fromPromise");
class Muc {
    constructor(client) {
        this._client = client;
        this._anonRoomFactory = new anonRoomFactory_1.default(this._client);
    }
    createAnonRoom(nick, roomName) {
        return Observable_1.Observable.defer(() => {
            return fromPromise_1.fromPromise(this._anonRoomFactory.createAnonRoom(nick, roomName));
        });
    }
    destroyRoom(roomName) {
        return Observable_1.Observable.defer(() => {
            return fromPromise_1.fromPromise(this._anonRoomFactory.destroyRoom(roomName));
        });
    }
}
exports.default = Muc;
//# sourceMappingURL=muc.js.map