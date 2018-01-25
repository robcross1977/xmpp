import Client from './client';
import ConnectedHandler from './handlers/connectedHandler';
import ConnectionOptions from './models/connectionOptions';

export default class Xmpp {
    public client: Client;

    constructor() {
        this._setupClient();
        this._setupHandlers();
    }

    _setupClient(): void {
        this.client = new Client();
    }

    // You can't do this until this.create is called
    // it won't have the 'on' EventEmitter method attached
    _setupHandlers(): void {}

    create(options: ConnectionOptions): void {
        this.client.create(options);
    }

    public connect(): void {
        this.client.connect();
    }
}