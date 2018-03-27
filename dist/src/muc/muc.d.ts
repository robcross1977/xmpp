import Client from '../client';
import { Observable } from 'rxjs/Observable';
export default class Muc {
    private _client;
    private _anonRoomFactory;
    constructor(client: Client);
    createAnonRoom: (nick: string, roomName?: string | undefined) => Observable<any>;
    destroyRoom: (roomName: string) => Observable<any>;
}
