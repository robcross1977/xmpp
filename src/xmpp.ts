import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';
import Client from './client';
import Handler from './handlers/handler';
import SessionStartedHandler from './handlers/sessionStartedHandler';
import AuthFailedHandler from './handlers/authFailedHandler';
import ConnectedHandler from './handlers/connectedHandler';
import ConnectionOptions from './models/connectionOptions';
import MucAvailableHandler from './handlers/mucAvailableHandler';
// import muc from './muc/muc';

export default class Xmpp {
    //private _muc: Muc;
    private _sessionStarted: boolean = false;
    private _client: Client;
    
    constructor() {
        this._setupClient();
    }

    private _setupClient(): void {
        this._client = new Client();
    }

    // You can't do this until this.create is called
    // it won't have the 'on' EventEmitter method attached
    private _setupHandlers(): void {
        this._client.addHandler(new ConnectedHandler());
        this._client.addHandler(new SessionStartedHandler());
        this._client.addHandler(new MucAvailableHandler());
        this._client.addHandler(new AuthFailedHandler());
    }

    public create(options: ConnectionOptions): void {
        this._client.create(options);
        
        this._setupHandlers();
    }

    public connect(): void {
        this._client.connect();
    }

    public subscribe(name: string): Subject<any> {
        return this._client.getHandler(name).subject;
    }

    public addHandler(handler: Handler<any>) {
        this._client.addHandler(handler);
    }

    public removeHandler(name: string) {
        this._client.removeHandler(name);
    }
}
/*
const xmpp = new Xmpp();
const opts = {
    jid: 'admin@murderbeard.com',
    password: 'd00d0012',
    transport: 'websocket',
    wsURL: 'ws://murderbeard.com:5280/websocket'
} as ConnectionOptions;

xmpp.create(opts);
xmpp.connect();
*/