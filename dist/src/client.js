"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stanzaIO = require("stanza.io");
const rxjs_1 = require("rxjs");
const _ = require("lodash");
const logger_1 = require("./logger");
const config_1 = require("./config");
class Client {
    constructor() {
        this._handlers = {};
        this.create = (options) => this._client = stanzaIO.createClient(options);
        this.connect = () => this._client.connect();
        this.disconnect = () => this._client.disconnect();
        this._bindHandlerToThis = (handler) => this._client.on(handler.name, handler.handler);
        this.getHandler = (name) => this._handlers[name];
        this.removeHandler = (name) => this._handlers = _.omit(this._handlers, name);
        this.joinRoom = (roomName, nick = config_1.Config.get('DEFAULT_NICK')) => this._client.joinRoom(roomName, nick);
        this.configureRoom = (roomName, options, callback) => this._client.configureRoom(roomName, options, callback);
        this.leaveRoom = (roomName, nick) => this._client.leaveRoom(roomName, nick);
        this.destroyRoom = (roomName) => rxjs_1.Observable.create((observer) => {
            logger_1.default.debug({ roomName: roomName }, 'destroying room', roomName);
            this._client.destroyRoom(roomName, {}, (err) => {
                if (err) {
                    logger_1.default.error({ error: err }, 'failed to destory room');
                    observer.error(err);
                }
                else {
                    logger_1.default.info(`destroyed room ${roomName}`);
                    observer.next(`destroyed room ${roomName}`);
                    observer.complete();
                }
            });
        });
    }
    get client() {
        return this._client;
    }
    addHandler(handler) {
        if (!(handler.name in this._handlers)) {
            this._handlers[handler.name] = handler;
            this._bindHandlerToThis(handler);
            return handler;
        }
        else {
            logger_1.default.error({ handler: handler }, 'Handler already exists at this key');
            throw new Error('Handler already exists at this key');
        }
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map