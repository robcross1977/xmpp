import ConnectionOptions from './models/connectionOptions';
import Handler from './handlers/handler';
import Logger from '@murderbeard/logger';
export default class Client {
    private _handlers;
    private _client;
    private _logger;
    sessionStarted: boolean;
    constructor(logger: Logger);
    readonly client: any;
    create(options: ConnectionOptions): void;
    connect(): void;
    disconnect(): void;
    addHandler(handler: Handler<any>): void;
    private _bindHandlerToThis(handler);
    getHandler(name: string): Handler<any>;
    removeHandler(name: string): void;
}
