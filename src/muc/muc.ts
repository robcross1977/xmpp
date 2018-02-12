import * as uuid from 'uuid/v4';
import Client from '../client';
import logger from '../logger';

export default class Muc {
    private _client: Client;

    public constructor(client: Client) {
        this._client = client;
    }

    public createPersistantAnonRoom(nick: string, roomName?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if(this._client.sessionStarted) {
                if(!!!roomName) {
                    roomName = this.generateRandomRoomName();
                }

                this._handleJoinedThisPersistantAnonRoom(roomName, nick)
                    .then((roomName: any) => {
                        this.leaveRoom(roomName, nick);
                        resolve(roomName);
                        logger.info(`${roomName} was created`);
                    })
                    .catch((err: any) => {
                        this.leaveRoom(roomName || '', nick);
                        reject(err);
                        logger.error({ error: err }, `failed to create ${roomName}`);
                    });

                this._client.client.joinRoom(roomName, nick); // this is going to get caught in the join muc room handler, follow it there
            } else {
                reject('session not started');
                logger.error('session not started');
            }
        }); 
    }

    public generateRandomRoomName(mucDomain?: string): string {
        const roomName = `${uuid()}${!!mucDomain ? mucDomain : '@conference.murderbeard.com'}`

        return roomName;
    }

    private _handleJoinedThisPersistantAnonRoom(roomName:string, nick: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // this will be emitted from  handler/joinedRoomHandler
            // so we know they joined the particular room we made
            this._client.client.on(`${roomName}-joined`, () => {
                logger.debug(`${roomName}-joined`);

                this.configurePersistantAnonRoom(roomName, nick)
                    .then(data => resolve(data))
                    .catch(err => reject(err));
            });
        });
    }

    public configurePersistantAnonRoom(roomName: string, nick: string): Promise<any> {
        return new Promise((resolve, reject) => {
            logger.debug(`configuring room ${ roomName }`);

            this._client.client.configureRoom(roomName, {
                fields: [
                    { name: 'FORM_TYPE', value: 'http://jabber.org/protocol/muc#roomconfig' }, 
                    { name: 'muc#roomconfig_maxusers', value: '20' },
                    { name: 'muc#roomconfig_publicroom', value: '0' },
                    { name: 'muc#roomconfig_persistentroom', value: '1' }
                ]
            }, (err: any) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(roomName);
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

        return new Promise((resolve, reject) => {
            this._client.client.destroyRoom(roomName, {}, (err: any) => {
                if(err) {
                    logger.error({ error: err }, 'failed to destory room');
                    reject(err);
                } else {
                    logger.info(`destoryed room ${ roomName }`);
                    resolve();
                }
            });
        });   
    }
}