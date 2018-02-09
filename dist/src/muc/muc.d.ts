import Client from '../client';
import Logger from '@murderbeard/logger';
export default class Muc {
    private _client;
    private _logger;
    constructor(client: Client, logger: Logger);
    createPersistantAnonRoom(nick: string, roomName?: string): Promise<any>;
    generateRandomRoomName(mucDomain?: string): string;
    private _handleJoinedThisPersistantAnonRoom(roomName, nick);
    configurePersistantAnonRoom(roomName: string, nick: string): Promise<any>;
    leaveRoom(roomName: string, nick: string): void;
    destroyRoom(roomName: string): Promise<any>;
}
