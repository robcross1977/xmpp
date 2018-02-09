import * as stanzaIO from 'stanza.io'
import { EventEmitter } from 'events';
import * as _ from 'lodash';
import ConnectionOptions from './models/connectionOptions';
import Handler from './handlers/handler';
import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';

export default class Client {
    private _handlers: { [name: string]: Handler<any>; } = {};
    private _client: any;
    private _logger: Logger;

    public sessionStarted: boolean = false;

    constructor(logger: Logger) {
        this._logger = logger;
    }

    public get client(): any {
        return this._client;
    }

    public create(options: ConnectionOptions): void {
        this._client = stanzaIO.createClient(options);

        this._client.on('session:started', () => {
            this.sessionStarted = true;

            this._logger.info('session started');
        });
    }

    public connect(): void {
        this._client.connect();
    }

    public disconnect(): void {
        this._client.disconnect();
    }

    public addHandler(handler: Handler<any>): void {
        if(!(handler.name in this._handlers)) {
            this._handlers[handler.name] = handler;

            this._bindHandlerToThis(handler);
        } else {
            this._logger.error({ handler: handler }, 'Handler already exists at this key');
            
            throw new Error('Handler already exists at this key');
        }
    }

    private _bindHandlerToThis(handler: Handler<any>): void {
        this._client.on(handler.name, handler.handler);

        // uncomment to debug. Shows all traffic
        // this.client.on('raw:*', console.log.bind(console))
    }

    public getHandler(name: string): Handler<any> {
        return this._handlers[name];
    }

    public removeHandler(name: string): void {
        this._handlers = _.omit(this._handlers, name);
    }
}