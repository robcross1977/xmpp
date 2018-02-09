import Handler from './handler';
import Client from '../client';
import Logger from '@murderbeard/logger';
export default class MucJoinHandler extends Handler<string> {
    private _xmppClient;
    constructor(client: Client, logger: Logger);
    handler: (data: any) => void;
}
