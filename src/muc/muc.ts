import * as uuid from 'uuid/v4';
import Client from '../client';
import logger from '../logger';
import AnonRoomFactory from './anonRoomFactory';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

export default class Muc {
    private _client: Client;
    private _anonRoomFactory: AnonRoomFactory;

    public constructor(client: Client) {
        this._client = client;
        this._anonRoomFactory = new AnonRoomFactory(this._client);
    }

    public createAnonRoom(nick: string, roomName?: string): Observable<any> {
        return Observable.defer(() => {
            return fromPromise(this._anonRoomFactory.createAnonRoom(nick, roomName))
        });
    }

    public destroyRoom(roomName: string): Observable<any> {
        return Observable.defer(() => {
            return fromPromise(this._anonRoomFactory.destroyRoom(roomName));
        });
    }
}