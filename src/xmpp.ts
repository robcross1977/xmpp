import { Subject } from 'rxjs';
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

export default class Xmpp {
    private _muc: Muc;
    private _client: Client;
    
    constructor() {
        this._client = new Client();
        this._muc = new Muc(this._client);
    }

    get muc(): Muc {
        return this._muc;
    }

    // You can't do this until this.create is called
    // it won't have the 'on' EventEmitter method attached
    private _setupHandlers(): void {
        this._client.addHandler(new AuthFailedHandler());
        this._client.addHandler(new AuthSuccessHandler());
        this._client.addHandler(new ConnectedHandler());
        this._client.addHandler(new DisconnectedHandler());
        this._client.addHandler(new MucAvailableHandler());
        this._client.addHandler(new MucDeclinedHandler());
        this._client.addHandler(new MucDestroyedHandler());
        this._client.addHandler(new MucErrorHandler());
        this._client.addHandler(new MucJoinHandler(this._client));
        this._client.addHandler(new MucLeaveHandler());
        this._client.addHandler(new MucUnavailableHandler());
        this._client.addHandler(new SessionEndHandler());
        this._client.addHandler(new SessionErrorHandler());
        this._client.addHandler(new SessionStartedHandler());
        this._client.addHandler(new StreamEndHandler());
    }

    public create(options: ConnectionOptions): void {
        this._client.create(options);
        this._setupHandlers();
    }

    public connect = (): void => this._client.connect();

    public disconnect = (): void => this._client.disconnect();

    public subject = (name: string): Subject<any> => this._client.getHandler(name).subject;

    public addHandler = (handler: Handler<any>): Handler<any> => this._client.addHandler(handler);

    public removeHandler = (name: string): any => this._client.removeHandler(name);
}