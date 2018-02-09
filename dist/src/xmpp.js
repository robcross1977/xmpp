"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const authFailedHandler_1 = require("./handlers/authFailedHandler");
const authSuccessHandler_1 = require("./handlers/authSuccessHandler");
const connectedHandler_1 = require("./handlers/connectedHandler");
const disconnectedHandler_1 = require("./handlers/disconnectedHandler");
const mucAvailableHandler_1 = require("./handlers/mucAvailableHandler");
const mucDeclinedHandler_1 = require("./handlers/mucDeclinedHandler");
const mucDestroyedHandler_1 = require("./handlers/mucDestroyedHandler");
const mucErrorHandler_1 = require("./handlers/mucErrorHandler");
const mucJoinHandler_1 = require("./handlers/mucJoinHandler");
const mucLeaveHandler_1 = require("./handlers/mucLeaveHandler");
const mucUnavailableHandler_1 = require("./handlers/mucUnavailableHandler");
const sessionEndHandler_1 = require("./handlers/sessionEndHandler");
const sessionErrorHandler_1 = require("./handlers/sessionErrorHandler");
const sessionStartedHandler_1 = require("./handlers/sessionStartedHandler");
const streamEndHandler_1 = require("./handlers/streamEndHandler");
const muc_1 = require("./muc/muc");
const logger_1 = require("@murderbeard/logger");
class Xmpp {
    constructor() {
        this._logger = new logger_1.default();
        this._client = new client_1.default(this._logger);
        this._muc = new muc_1.default(this._client, this._logger);
    }
    get muc() {
        return this._muc;
    }
    // You can't do this until this.create is called
    // it won't have the 'on' EventEmitter method attached
    _setupHandlers() {
        this._client.addHandler(new authFailedHandler_1.default(this._logger));
        this._client.addHandler(new authSuccessHandler_1.default(this._logger));
        this._client.addHandler(new connectedHandler_1.default(this._logger));
        this._client.addHandler(new disconnectedHandler_1.default(this._logger));
        this._client.addHandler(new mucAvailableHandler_1.default(this._logger));
        this._client.addHandler(new mucDeclinedHandler_1.default(this._logger));
        this._client.addHandler(new mucDestroyedHandler_1.default(this._logger));
        this._client.addHandler(new mucErrorHandler_1.default(this._logger));
        this._client.addHandler(new mucJoinHandler_1.default(this._client, this._logger));
        this._client.addHandler(new mucLeaveHandler_1.default(this._logger));
        this._client.addHandler(new mucUnavailableHandler_1.default(this._logger));
        this._client.addHandler(new sessionEndHandler_1.default(this._logger));
        this._client.addHandler(new sessionErrorHandler_1.default(this._logger));
        this._client.addHandler(new sessionStartedHandler_1.default(this._logger));
        this._client.addHandler(new streamEndHandler_1.default(this._logger));
    }
    create(options) {
        this._client.create(options);
        this._setupHandlers();
    }
    connect() {
        this._client.connect();
    }
    disconnect() {
        this._client.disconnect();
    }
    subscribe(name) {
        return this._client.getHandler(name).subject;
    }
    addHandler(handler) {
        this._client.addHandler(handler);
    }
    removeHandler(name) {
        this._client.removeHandler(name);
    }
}
exports.default = Xmpp;
//# sourceMappingURL=xmpp.js.map