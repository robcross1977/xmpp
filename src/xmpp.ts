import Client from './client';
import ConnectedHandler from './handlers/connectedHandler';
import ConnectionOptions from './models/connectionOptions';

export default class Xmpp {
    public client: Client;

    constructor() {
        this._setupClient();
    }

    _setupClient(): void {
        this.client = new Client();
    }

    // You can't do this until this.create is called
    // it won't have the 'on' EventEmitter method attached
    _setupHandlers(): void {
        this.client.addHandler(new ConnectedHandler());
    }

    create(options: ConnectionOptions): void {
        this.client.create(options);
        this._setupHandlers();
    }

    public connect(): void {
        this.client.connect();
    }
}

/* Uncomment to use
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