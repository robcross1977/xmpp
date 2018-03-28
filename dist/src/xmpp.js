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
class Xmpp {
    constructor() {
        this.connect = () => this._client.connect();
        this.disconnect = () => this._client.disconnect();
        this.subject = (name) => this._client.getHandler(name).subject;
        this.addHandler = (handler) => this._client.addHandler(handler);
        this.removeHandler = (name) => this._client.removeHandler(name);
        this._client = new client_1.default();
        this._muc = new muc_1.default(this._client);
    }
    get muc() {
        return this._muc;
    }
    // You can't do this until this.create is called
    // it won't have the 'on' EventEmitter method attached
    _setupHandlers() {
        this._client.addHandler(new authFailedHandler_1.default());
        this._client.addHandler(new authSuccessHandler_1.default());
        this._client.addHandler(new connectedHandler_1.default());
        this._client.addHandler(new disconnectedHandler_1.default());
        this._client.addHandler(new mucAvailableHandler_1.default());
        this._client.addHandler(new mucDeclinedHandler_1.default());
        this._client.addHandler(new mucDestroyedHandler_1.default());
        this._client.addHandler(new mucErrorHandler_1.default());
        this._client.addHandler(new mucJoinHandler_1.default(this._client));
        this._client.addHandler(new mucLeaveHandler_1.default());
        this._client.addHandler(new mucUnavailableHandler_1.default());
        this._client.addHandler(new sessionEndHandler_1.default());
        this._client.addHandler(new sessionErrorHandler_1.default());
        this._client.addHandler(new sessionStartedHandler_1.default());
        this._client.addHandler(new streamEndHandler_1.default());
    }
    create(options) {
        this._client.create(options);
        this._setupHandlers();
    }
}
exports.default = Xmpp;
/*
import 'rxjs/add/operator/first';
import { concat } from 'rxjs/observable/concat';

const xmpp = new Xmpp();

xmpp.create({
    jid: 'admin@murderbeard.com',
    password: 'd00d0012',
    transport: 'websocket',
    wsURL: 'ws://murderbeard.com:5280/websocket'
});

concat(
    xmpp.subject('session:started').first(),
    xmpp.muc.createAnonRoom('admin')
    //xmpp.muc.destroyRoom('31118f48-8aed-440f-aba6-a2412d5b2ff4@conference.murderbeard.com')
)
.subscribe({
    next: () => {},
    error: (error: any) => { console.error({error: error}, "some weird fucking error happened")},
    complete: () => {
        console.log("the whole app is complete");
        //process.exit(0);
    }
})

xmpp.connect();
*/ 
//# sourceMappingURL=xmpp.js.map