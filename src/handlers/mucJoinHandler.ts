import Handler from './handler';
import Client from '../client';
import logger from '../logger';

export default class MucJoinHandler extends Handler<string> {
    private _xmppClient: Client;

    constructor(client: Client) {
        super();

        this._xmppClient = client;
        this.name = 'muc:join';
    }
 
    handler = (data: any): void => {
        logger.info({ data: data }, this.name);
        
        this.subject.next(this.name);

        // when we join a specific room we want to be able to have event data about it while it exists
        this._xmppClient.client.emit(`${data.from.bare}-joined`);
    };
}
