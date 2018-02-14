"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const Observable_1 = require("rxjs/Observable");
const fromPromise_1 = require("rxjs/observable/fromPromise");
const concat_1 = require("rxjs/observable/concat");
require("rxjs/add/operator/timeout");
require("rxjs/add/operator/retry");
require("rxjs/add/observable/defer");
const joinedSpecificRoomHandler_1 = require("../handlers/joinedSpecificRoomHandler");
const logger_1 = require("../logger");
const config_1 = require("../config");
class AnonRoomFactory {
    constructor(client) {
        this._client = client;
    }
    createAnonRoom(nick, roomName) {
        return new Promise((resolve, reject) => {
            const finalRoomName = this._getFinalRoomname(roomName);
            const joinedRoom$ = this._handleJoinedAnonRoom(finalRoomName, nick);
            const configureRoom$ = Observable_1.Observable.defer(() => {
                return fromPromise_1.fromPromise(this._configureRoom(finalRoomName, nick));
            });
            concat_1.concat(joinedRoom$, configureRoom$).timeout(config_1.default.createAnonRoomTimeout).retry(config_1.default.createAnonRoomRetryCount)
                .subscribe({
                next: () => { },
                error: (error) => {
                    logger_1.default.error({ error: error, roomName: roomName }, 'An error occured while creating room');
                    this._cleanUpJoinRoom(finalRoomName, nick);
                    reject(error);
                },
                complete: () => {
                    logger_1.default.info({ roomName: roomName }, 'Completed creating room');
                    this._cleanUpJoinRoom(finalRoomName, nick);
                    resolve(roomName);
                }
            });
            // This actually starts the observable train we set up just prior
            // by triggering the mucJoinedHandler which clicks "next" in
            // the handler and emits the right event see the handler. 
            this._client.client.joinRoom(finalRoomName, nick);
        });
    }
    _getFinalRoomname(roomName, mucDomain) {
        if (!!!roomName) {
            return `${uuid()}${!!mucDomain ? mucDomain : '@conference.murderbeard.com'}`;
        }
        return roomName;
    }
    _cleanUpJoinRoom(roomName, nick) {
        this._client.removeHandler(`${roomName}-joined`);
        this.leaveRoom(roomName, nick);
    }
    _handleJoinedAnonRoom(roomName, nick) {
        this._client.addHandler(new joinedSpecificRoomHandler_1.default(roomName));
        return this._client.getHandler(`${roomName}-joined`).subject; // a subject is a multi-cast observable
    }
    _configureRoom(roomName, nick) {
        return new Promise((resolve, reject) => {
            logger_1.default.debug(`configuring room ${roomName}`);
            this._client.client.configureRoom(roomName, {
                fields: [
                    { name: 'FORM_TYPE', value: 'http://jabber.org/protocol/muc#roomconfig' },
                    { name: 'muc#roomconfig_maxusers', value: '20' },
                    { name: 'muc#roomconfig_publicroom', value: '0' },
                    { name: 'muc#roomconfig_persistentroom', value: '1' }
                ]
            }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(roomName);
                }
            });
        });
    }
    leaveRoom(roomName, nick) {
        logger_1.default.debug(`${nick} leaving room ${roomName}`);
        this._client.client.leaveRoom(roomName, nick);
    }
    destroyRoom(roomName) {
        logger_1.default.debug('destroying room', roomName);
        return new Promise((resolve, reject) => {
            this._client.client.destroyRoom(roomName, {}, (err) => {
                if (err) {
                    logger_1.default.error({ error: err }, 'failed to destory room');
                    reject(err);
                }
                else {
                    logger_1.default.info(`destroyed room ${roomName}`);
                    resolve();
                }
            });
        });
    }
}
exports.default = AnonRoomFactory;
//# sourceMappingURL=anonRoomFactory.js.map