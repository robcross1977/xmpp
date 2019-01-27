import Client from '../client';
import AnonRoomFactory from './anonRoomFactory';
import { Observable } from 'rxjs';

export default class Muc {
    private _client: Client;
    private _anonRoomFactory: AnonRoomFactory;

    public constructor(client: Client) {
        this._client = client;
        this._anonRoomFactory = new AnonRoomFactory(this._client);
    }

    public createAnonRoom =
        (nick: string, roomName?: string): Observable<any> =>
            this._anonRoomFactory.create(nick, roomName);

    public destroyRoom =
        (roomName: string): Observable<any> =>
            this._anonRoomFactory.destroyRoom(roomName);
}