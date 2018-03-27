import { Observable } from 'rxjs/Observable';
import ConnectionOptions from './models/connectionOptions';
import Handler from './handlers/handler';
export default class Client {
    private _handlers;
    private _client;
    constructor();
    readonly client: any;
    create: (options: ConnectionOptions) => any;
    connect: () => void;
    disconnect: () => void;
    addHandler(handler: Handler<any>): Handler<any>;
    private _bindHandlerToThis;
    getHandler: (name: string) => Handler<any>;
    removeHandler: (name: string) => any;
    joinRoom: (roomName: string | undefined, nick?: string) => void;
    configureRoom: (roomName: string, options: object, callback: Function) => void;
    leaveRoom: (roomName: string, nick: string) => void;
    destroyRoom: (roomName: string) => Observable<any>;
}
