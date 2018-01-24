import * as stanzaIO from 'stanza.io'
import { EventEmitter } from 'events';
import * as _ from 'lodash';
import ConnectionOptions from './models/connectionOptions';
import Handler from './handlers/handler';

export default class Client extends EventEmitter {
    private _handlers: { [name: string]: Handler; } = {};

    constructor() {
        super();
    }

    create(options: ConnectionOptions): void {
        stanzaIO.createClient(options);
    }

    connect(): void {
        stanzaIO.connect();
    }

    addHandler(handler: Handler) {
        if(!(handler.name in this._handlers)) {
            this._handlers[handler.name] = handler;
        } else {
            throw new Error('Handler already exists at this key');
        }
    }

    getHandler(name: string): Handler {
        return this._handlers[name];
    }

    removeHandler(name: string) {
        this._handlers = _.omit(this._handlers, name);
    }
}