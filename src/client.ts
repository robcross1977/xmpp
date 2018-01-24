import * as stanzaIO from 'stanza.io'
import * as _ from 'lodash';
import ConnectionOptions from './models/connectionOptions';
import Handler from './handlers/handler';
import { Subject } from 'rxjs/Subject';

export default class Client {
    public handlers: { [name: string]: Handler<any>; } = {};
    private _client: any;
    
    constructor() {}

    create(options: ConnectionOptions): void {
        this._client = stanzaIO.createClient(options);
    }

    connect(): void {
        this._client.connect();
    }

    addHandler(handler: Handler<any>) {
        if(!(handler.name in this.handlers)) {
            this.handlers[handler.name] = handler;
            this._bindHandlerToThis(handler);
        } else {
            throw new Error('Handler already exists at this key');
        }
    }

    _bindHandlerToThis(handler: Handler<any>) {
        this._client.on(handler.name, handler.handler);
    }

    getHandler(name: string): Handler<any> {
        return this.handlers[name];
    }

    removeHandler(name: string) {
        this.handlers = _.omit(this.handlers, name);
    }
}