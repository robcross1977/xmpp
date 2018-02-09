"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stanzaIO = require("stanza.io");
const _ = require("lodash");
class Client {
    constructor(logger) {
        this._handlers = {};
        this.sessionStarted = false;
        this._logger = logger;
    }
    get client() {
        return this._client;
    }
    create(options) {
        this._client = stanzaIO.createClient(options);
        this._client.on('session:started', () => {
            this.sessionStarted = true;
            this._logger.info('session started');
        });
    }
    connect() {
        this._client.connect();
    }
    disconnect() {
        this._client.disconnect();
    }
    addHandler(handler) {
        if (!(handler.name in this._handlers)) {
            this._handlers[handler.name] = handler;
            this._bindHandlerToThis(handler);
        }
        else {
            this._logger.error({ handler: handler }, 'Handler already exists at this key');
            throw new Error('Handler already exists at this key');
        }
    }
    _bindHandlerToThis(handler) {
        this._client.on(handler.name, handler.handler);
        // uncomment to debug. Shows all traffic
        // this.client.on('raw:*', console.log.bind(console))
    }
    getHandler(name) {
        return this._handlers[name];
    }
    removeHandler(name) {
        this._handlers = _.omit(this._handlers, name);
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map