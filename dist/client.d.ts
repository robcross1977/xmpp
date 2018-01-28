import ConnectionOptions from './models/connectionOptions';
import Handler from './handlers/handler';
export default class Client {
    private _handlers;
    private _client;
    sessionStarted: boolean;
    constructor();
    readonly client: any;
    create(options: ConnectionOptions): void;
    connect(): void;
    disconnect(): void;
    addHandler(handler: Handler<any>): void;
    private _bindHandlerToThis(handler);
    getHandler(name: string): Handler<any>;
    removeHandler(name: string): void;
}
