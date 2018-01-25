import * as stanzaIO from 'stanza.io'
import { EventEmitter } from 'events';
import * as _ from 'lodash';
import ConnectionOptions from './models/connectionOptions';
import Handler from './handlers/handler';
import { Subject } from 'rxjs/Subject';

export default class Client {
    public handlers: { [name: string]: Handler<any>; } = {};
    public client: any;
    public sessionStarted = false;

    constructor() {}

    create(options: ConnectionOptions): void {
        this.client = stanzaIO.createClient(options);
    }

    connect(): void {
        this.client.connect();
    }

    addHandler(handler: Handler<any>): void {
        if(this.sessionStarted) {
            if(!(handler.name in this.handlers)) {
                this.handlers[handler.name] = handler;
                this._bindHandlerToThis(handler);
            } else {
                throw new Error('Handler already exists at this key');
            }
        } else {
            throw new Error('Session has to be started to add handlers');
        }
    }

    _bindHandlerToThis(handler: Handler<any>): void {
        this.client.on(handler.name, handler.handler);
    }

    getHandler(name: string): Handler<any> {
        return this.handlers[name];
    }

    removeHandler(name: string): void {
        this.handlers = _.omit(this.handlers, name);
    }
}