import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/defer';
import Client from '../client';
export default class AnonRoomFactory {
    private _client;
    constructor(client: Client);
    createAnonRoom(nick: string, roomName?: string): Promise<any>;
    private _getFinalRoomname(roomName, mucDomain?);
    private _cleanUpJoinRoom(roomName, nick);
    private _handleJoinedAnonRoom(roomName, nick);
    private _configureRoom(roomName, nick);
    leaveRoom(roomName: string, nick: string): void;
    destroyRoom(roomName: string): Promise<any>;
}
