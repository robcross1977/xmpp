import { Subject } from 'rxjs/Subject';
import Handler from './handlers/handler';
import ConnectionOptions from './models/connectionOptions';
import Muc from './muc/muc';
export default class Xmpp {
    private _muc;
    private _client;
    private _logger;
    constructor();
    readonly muc: Muc;
    private _setupHandlers();
    create(options: ConnectionOptions): void;
    connect(): void;
    disconnect(): void;
    subscribe(name: string): Subject<any>;
    addHandler(handler: Handler<any>): void;
    removeHandler(name: string): void;
}
