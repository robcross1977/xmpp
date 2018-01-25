import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';
import Client from './client';
import Handler from './handlers/handler';
import SessionStartedHandler from './handlers/sessionStartedHandler';
import ConnectedHandler from './handlers/connectedHandler';
import ConnectionOptions from './models/connectionOptions';

export default class Xmpp {
    public client: Client;

    constructor() {
        this._setupClient();
    }

    private _setupClient(): void {
        this.client = new Client();
    }

    // You can't do this until this.create is called
    // it won't have the 'on' EventEmitter method attached
    private _setupHandlers(): void {
        this.client.addHandler(new ConnectedHandler());
        this.client.addHandler(new SessionStartedHandler());
    }

    public create(options: ConnectionOptions): void {
        this.client.create(options);
        this._setupHandlers();
    }

    public connect(): void {
        this.client.connect();
    }

    public subscribe(name: string): Subject<any> {
        return this.client.getHandler(name).subject;
    }

    public addHandler(handler: Handler<any>) {
        this.client.addHandler(handler);
    }

    public removeHandler(name: string) {
        this.client.removeHandler(name);
    }
}

const xmpp = new Xmpp();
const opts = {
    jid: 'admin@murderbeard.com',
    password: 'd00d0012',
    transport: 'websocket',
    wsURL: 'ws://murderbeard.com:5280/websocket'
} as ConnectionOptions;

xmpp.create(opts);
xmpp.connect();
