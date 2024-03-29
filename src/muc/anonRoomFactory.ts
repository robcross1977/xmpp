import * as uuid from 'uuid/v4';
import { Subject, Observable, concat, Observer } from 'rxjs'
import { last, retry, timeout } from 'rxjs/operators';
import JoinedSpecificRoomHandler from '../handlers/joinedSpecificRoomHandler';
import Client from '../client';
import logger from '../logger';
import { Config } from '../config';

export default class AnonRoomFactory {
    private _client: Client;

    public constructor(client: Client) {
        this._client = client;
    }

    public get client(): Client {
        return this._client;
    }

    public create = (nick: string, roomName?: string): Observable<any> =>
        // We create the observable here and then call the function to trigger it right after
        Observable.create((observer: Observer<any>) => {
            const finalRoomName = this._getRoomname(roomName);

            concat(
                this._createJoinedSpecificRoomHandler(finalRoomName),
                this.configureRoom(finalRoomName)
            )
            .pipe(last())
            .pipe(retry(+Config.get('CREATE_ANON_ROOM_RETRY_COUNT')))
            .subscribe({
                next: (data: any) => {
                    observer.next(data);
                },
                error: (error: any) => {
                    logger.error({ error: error, roomName: finalRoomName }, 'An error occured while creating room');
                    this._cleanUpJoinRoom(finalRoomName, nick);
                    observer.error(error);
                },
                complete: () => {
                    logger.info({ roomName: finalRoomName }, 'Completed creating room');
                    this._cleanUpJoinRoom(finalRoomName, nick);
                    observer.complete();
                }
            });
            
            // This actually starts the observable train we set up just prior
            // by triggering the mucJoinedHandler which clicks "next" in
            // the handler and emits the right event see the handler. 
            this.joinRoom(finalRoomName, nick);
        });

    private _getRoomname = 
        (roomName: string | undefined, mucDomain?: string): string =>
            roomName || 
            `${uuid()}${!!mucDomain ? mucDomain : '@conference.murderbeard.com'}`;

    private _cleanUpJoinRoom(roomName: string, nick: string): void {
        this.leaveRoom(roomName, nick);
        this._client.removeHandler(`${roomName}-joined`);
    }

    private _createJoinedSpecificRoomHandler = 
        (roomName:string): Subject<any> =>
            this._client.addHandler(
                new JoinedSpecificRoomHandler(roomName)
            ).subject;

    public joinRoom = 
        (roomName: string, nick: string): void =>
            this._client.joinRoom(roomName, nick);

    public configureRoom(roomName: string): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            logger.debug(`configuring room ${ roomName }`);

            this._client.configureRoom(roomName, {
                fields: [
                    { name: 'FORM_TYPE', value: 'http://jabber.org/protocol/muc#roomconfig' }, 
                    { name: 'muc#roomconfig_maxusers', value: '20' },
                    { name: 'muc#roomconfig_publicroom', value: '0' },
                    { name: 'muc#roomconfig_persistentroom', value: '1' }
                ]
            }, 
            (err: any) => {
                if(err) {
                    observer.error(err);
                } else {
                    observer.next(roomName);
                    observer.complete();
                }
            });
        });
    }

    public leaveRoom = 
        (roomName: string, nick: string): void =>
            this._client.leaveRoom(roomName, nick);

    public destroyRoom =
        (roomName: string): Observable<any> =>
            this._client.destroyRoom(roomName);
}
