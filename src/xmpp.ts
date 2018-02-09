import { Subject } from 'rxjs/Subject';
import Client from './client';
import Handler from './handlers/handler';
import AuthFailedHandler from './handlers/authFailedHandler';
import AuthSuccessHandler from './handlers/authSuccessHandler';
import ConnectedHandler from './handlers/connectedHandler';
import DisconnectedHandler from './handlers/disconnectedHandler';
import ConnectionOptions from './models/connectionOptions';
import MucAvailableHandler from './handlers/mucAvailableHandler';
import MucDeclinedHandler from './handlers/mucDeclinedHandler';
import MucDestroyedHandler from './handlers/mucDestroyedHandler';
import MucErrorHandler from './handlers/mucErrorHandler';
import MucJoinHandler from './handlers/mucJoinHandler';
import MucLeaveHandler from './handlers/mucLeaveHandler';
import MucUnavailableHandler from './handlers/mucUnavailableHandler';
import SessionEndHandler from './handlers/sessionEndHandler';
import SessionErrorHandler from './handlers/sessionErrorHandler';
import SessionStartedHandler from './handlers/sessionStartedHandler';
import StreamEndHandler from './handlers/streamEndHandler';
import Muc from './muc/muc';
import Logger from '@murderbeard/logger';

export default class Xmpp {
    private _muc: Muc;
    private _client: Client;
    private _logger: Logger;
    
    constructor() {
        this._logger = new Logger({
            name: '@murderbeard/xmpp',
            level: 'error',
            streams: [{
                    level: 'error',
                    path: './error.log'
            }]
        });

        this._setupDevLogger();

        this._client = new Client(this._logger);
        this._muc = new Muc(this._client, this._logger);
    }

    private _setupDevLogger() {
        if(process.env['NODE_ENV'] === 'dev') {
            this._logger.addStream({
                level: 'debug',
                stream: process.stdout
            });

            this._logger.addStream({
                level: 'debug',
                path: 'debug.log'
            });
        }
    }

    get muc(): Muc {
        return this._muc;
    }

    // You can't do this until this.create is called
    // it won't have the 'on' EventEmitter method attached
    private _setupHandlers(): void {
        this._client.addHandler(new AuthFailedHandler(this._logger));
        this._client.addHandler(new AuthSuccessHandler(this._logger));
        this._client.addHandler(new ConnectedHandler(this._logger));
        this._client.addHandler(new DisconnectedHandler(this._logger));
        this._client.addHandler(new MucAvailableHandler(this._logger));
        this._client.addHandler(new MucDeclinedHandler(this._logger));
        this._client.addHandler(new MucDestroyedHandler(this._logger));
        this._client.addHandler(new MucErrorHandler(this._logger));
        this._client.addHandler(new MucJoinHandler(this._client, this._logger));
        this._client.addHandler(new MucLeaveHandler(this._logger));
        this._client.addHandler(new MucUnavailableHandler(this._logger));
        this._client.addHandler(new SessionEndHandler(this._logger));
        this._client.addHandler(new SessionErrorHandler(this._logger));
        this._client.addHandler(new SessionStartedHandler(this._logger));
        this._client.addHandler(new StreamEndHandler(this._logger));
    }

    public create(options: ConnectionOptions): void {
        this._client.create(options);
        
        this._setupHandlers();
    }

    public connect(): void {
        this._client.connect();
    }

   public disconnect(): void {
       this._client.disconnect();
   }

    public subscribe(name: string): Subject<any> {
        return this._client.getHandler(name).subject;
    }

    public addHandler(handler: Handler<any>) {
        this._client.addHandler(handler);
    }

    public removeHandler(name: string) {
        this._client.removeHandler(name);
    }
}