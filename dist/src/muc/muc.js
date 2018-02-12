"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const logger_1 = require("../logger");
class Muc {
    constructor(client) {
        this._client = client;
    }
    createPersistantAnonRoom(nick, roomName) {
        return new Promise((resolve, reject) => {
            if (this._client.sessionStarted) {
                if (!!!roomName) {
                    roomName = this.generateRandomRoomName();
                }
                this._handleJoinedThisPersistantAnonRoom(roomName, nick)
                    .then((roomName) => {
                    this.leaveRoom(roomName, nick);
                    resolve(roomName);
                    logger_1.default.info(`${roomName} was created`);
                })
                    .catch((err) => {
                    this.leaveRoom(roomName || '', nick);
                    reject(err);
                    logger_1.default.error({ error: err }, `failed to create ${roomName}`);
                });
                this._client.client.joinRoom(roomName, nick); // this is going to get caught in the join muc room handler, follow it there
            }
            else {
                reject('session not started');
                logger_1.default.error('session not started');
            }
        });
    }
    generateRandomRoomName(mucDomain) {
        const roomName = `${uuid()}${!!mucDomain ? mucDomain : '@conference.murderbeard.com'}`;
        return roomName;
    }
    _handleJoinedThisPersistantAnonRoom(roomName, nick) {
        return new Promise((resolve, reject) => {
            // this will be emitted from  handler/joinedRoomHandler
            // so we know they joined the particular room we made
            this._client.client.on(`${roomName}-joined`, () => {
                logger_1.default.debug(`${roomName}-joined`);
                this.configurePersistantAnonRoom(roomName, nick)
                    .then(data => resolve(data))
                    .catch(err => reject(err));
            });
        });
    }
    configurePersistantAnonRoom(roomName, nick) {
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
                    logger_1.default.info(`destoryed room ${roomName}`);
                    resolve();
                }
            });
        });
    }
}
exports.default = Muc;
//# sourceMappingURL=muc.js.map