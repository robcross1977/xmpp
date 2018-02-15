import * as uuid from 'uuid/v4';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { concat } from 'rxjs/observable/concat';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/defer';
import JoinedSpecificRoomHandler from '../handlers/joinedSpecificRoomHandler';
import Client from '../client';
import logger from '../logger';
import config from '../config';
import { Observer } from 'rxjs/Observer';

export default class AnonRoomFactory {
    private _client: Client;

    public constructor(client: Client) {
        this._client = client;
    }

    public createAnonRoom(nick: string, roomName?: string): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            const finalRoomName = this._getFinalRoomname(roomName);
            const joinedRoom$ = this._handleJoinedAnonRoom(finalRoomName, nick);
            const configureRoom$ = this._configureRoom(finalRoomName, nick);

            concat(joinedRoom$, configureRoom$).timeout(config.createAnonRoomTimeout).retry(config.createAnonRoomRetryCount)
                .subscribe({
                    next: (data) => { observer.next(data); },
                    error: (error: any) => {
                        logger.error({ error: error, roomName: roomName }, 'An error occured while creating room');
                        this._cleanUpJoinRoom(finalRoomName, nick);
                        observer.error(error);
                    },
                    complete: () => {
                        logger.info({ roomName: roomName }, 'Completed creating room');
                        this._cleanUpJoinRoom(finalRoomName, nick);
                        observer.complete();
                    }
                });
            
            // This actually starts the observable train we set up just prior
            // by triggering the mucJoinedHandler which clicks "next" in
            // the handler and emits the right event see the handler. 
            this._client.client.joinRoom(finalRoomName, nick);
        });
    }
    
    private _getFinalRoomname(roomName: string | undefined, mucDomain?: string): string {
        if(!!!roomName) {
            return `${uuid()}${!!mucDomain ? mucDomain : '@conference.murderbeard.com'}`;
        }

        return roomName;
    }

    private _cleanUpJoinRoom(roomName: string, nick: string): void {
        this._client.removeHandler(`${roomName}-joined`);
        this.leaveRoom(roomName, nick);
    }

    private _handleJoinedAnonRoom(roomName:string, nick: string): Subject<any> {
        this._client.addHandler(new JoinedSpecificRoomHandler(roomName));
        return this._client.getHandler(`${roomName}-joined`).subject; // a subject is a multi-cast observable
    }

    private _configureRoom(roomName: string, nick: string): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            logger.debug(`configuring room ${ roomName }`);

            this._client.client.configureRoom(roomName, {
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

    public leaveRoom(roomName: string, nick: string): void {
        logger.debug(`${ nick } leaving room ${ roomName }`);

        this._client.client.leaveRoom(roomName, nick);
    }

    public destroyRoom(roomName: string): Promise<any> {
        logger.debug('destroying room', roomName);

        return Observable.create((observer: Observer<any>) => {
            this._client.client.destroyRoom(roomName, {}, (err: any) => {
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
}
