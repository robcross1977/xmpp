import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';
import Client from '../client';
export default class AnonRoomFactory {
    private _client;
    constructor(client: Client);
    readonly client: Client;
    create: (nick: string, roomName?: string | undefined) => Observable<any>;
    private _getRoomname;
    private _cleanUpJoinRoom(roomName, nick);
    private _createJoinedSpecificRoomHandler;
    joinRoom: (roomName: string, nick: string) => void;
    configureRoom(roomName: string, nick: string): Observable<any>;
    leaveRoom: (roomName: string, nick: string) => void;
    destroyRoom: (roomName: string) => Observable<any>;
}
