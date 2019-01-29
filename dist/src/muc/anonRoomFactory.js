"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const joinedSpecificRoomHandler_1 = require("../handlers/joinedSpecificRoomHandler");
const logger_1 = require("../logger");
const config_1 = require("../config");
class AnonRoomFactory {
    constructor(client) {
        this.create = (nick, roomName) => rxjs_1.Observable.create((observer) => {
            const finalRoomName = this._getRoomname(roomName);
            rxjs_1.concat(this._createJoinedSpecificRoomHandler(finalRoomName, nick), this.configureRoom(finalRoomName, nick))
                .pipe(operators_1.timeout(+config_1.Config.get('CREATE_ANON_ROOM_TIMEOUT')))
                .pipe(operators_1.retry(+config_1.Config.get('CREATE_ANON_ROOM_RETRY_COUNT')))
                .subscribe({
                next: (data) => {
                    observer.next(data);
                },
                error: (error) => {
                    logger_1.default.error({ error: error, roomName: finalRoomName }, 'An error occured while creating room');
                    this._cleanUpJoinRoom(finalRoomName, nick);
                    observer.error(error);
                },
                complete: () => {
                    logger_1.default.info({ roomName: finalRoomName }, 'Completed creating room');
                    this._cleanUpJoinRoom(finalRoomName, nick);
                    observer.complete();
                }
            });
            // This actually starts the observable train we set up just prior
            // by triggering the mucJoinedHandler which clicks "next" in
            // the handler and emits the right event see the handler. 
            this.joinRoom(finalRoomName, nick);
        });
        this._getRoomname = (roomName, mucDomain) => roomName ||
            `${uuid()}${!!mucDomain ? mucDomain : '@conference.murderbeard.com'}`;
        this._createJoinedSpecificRoomHandler = (roomName, nick) => this._client.addHandler(new joinedSpecificRoomHandler_1.default(roomName)).subject;
        this.joinRoom = (roomName, nick) => this._client.joinRoom(roomName, nick);
        this.leaveRoom = (roomName, nick) => this._client.leaveRoom(roomName, nick);
        this.destroyRoom = (roomName) => this._client.destroyRoom(roomName);
        this._client = client;
    }
    get client() {
        return this._client;
    }
    _cleanUpJoinRoom(roomName, nick) {
        this.leaveRoom(roomName, nick);
        this._client.removeHandler(`${roomName}-joined`);
    }
    configureRoom(roomName, nick) {
        return rxjs_1.Observable.create((observer) => {
            logger_1.default.debug(`configuring room ${roomName}`);
            this._client.configureRoom(roomName, {
                fields: [
                    { name: 'FORM_TYPE', value: 'http://jabber.org/protocol/muc#roomconfig' },
                    { name: 'muc#roomconfig_maxusers', value: '20' },
                    { name: 'muc#roomconfig_publicroom', value: '0' },
                    { name: 'muc#roomconfig_persistentroom', value: '1' }
                ]
            }, (err) => {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(roomName);
                    observer.complete();
                }
            });
        });
    }
}
exports.default = AnonRoomFactory;
//# sourceMappingURL=anonRoomFactory.js.map