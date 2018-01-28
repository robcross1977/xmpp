import Handler from './handler';
import Client from '../client';
export default class MucJoinHandler extends Handler<string> {
    private _xmppClient;
    constructor(client: Client);
    handler: (data: any) => void;
}
