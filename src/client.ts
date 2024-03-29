import * as stanzaIO from 'stanza.io';
import { Observable, Observer } from 'rxjs';
import * as _ from 'lodash';
import ConnectionOptions from './models/connectionOptions';
import Handler from './handlers/handler';
import logger from './logger';
import { Config }  from './config';

export default class Client {
    private _handlers: { [name: string]: Handler<any>; } = {};
    private _client: any;

    constructor() {}

    public get client(): any {
        return this._client;
    }

    public create =
        (options: ConnectionOptions) =>
            this._client = stanzaIO.createClient(options);

    public connect =
        (): void =>
            this._client.connect();

    public disconnect =
        (): void =>
            this._client.disconnect();

    public addHandler(handler: Handler<any>): Handler<any> {
        if(!(handler.name in this._handlers)) {
            this._handlers[handler.name] = handler;

            this._bindHandlerToThis(handler);

            return handler;
        } else {
            logger.error({ handler: handler }, 'Handler already exists at this key');
            
            throw new Error('Handler already exists at this key');
        }
    }

    private _bindHandlerToThis =
        (handler: Handler<any>) =>
            this._client.on(handler.name, handler.handler);

    public getHandler =
        (name: string): Handler<any> =>
            this._handlers[name];

    public removeHandler =
        (name: string): any =>
            this._handlers = _.omit(this._handlers, name);

    public joinRoom =
        (roomName: string | undefined, nick: string = Config.get('DEFAULT_NICK')): void =>
            this._client.joinRoom(roomName, nick); 
    
    public configureRoom =
        (roomName: string, options: object, callback: Function): void =>
            this._client.configureRoom(roomName, options, callback);

    public leaveRoom =
        (roomName: string, nick: string): void =>
            this._client.leaveRoom(roomName, nick);

    public destroyRoom = 
        (roomName: string): Observable<any> => 
            Observable.create((observer: Observer<any>) => {
                logger.debug({ roomName: roomName }, 'destroying room', roomName);

                this._client.destroyRoom(roomName, {}, (err: any) => {
                    if(err) {
                        logger.error({ error: err }, 'failed to destory room');
                        observer.error(err);
                    } else {
                        logger.info(`destroyed room ${ roomName }`);
                        observer.next(`destroyed room ${ roomName }`);
                        observer.complete();
                    }
                });
            });
}