import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import Client from '../client';

import * as colors from 'colors';

export default class MucJoinHandler extends Handler<string> {
    private _xmppClient: Client;

    constructor(client: Client) {
        super();

        this._xmppClient = client;
        this.name = 'muc:join';
    }
 
    handler = (data: any): void => {
        console.info(colors.green('#'), colors.green(`-- ${this.name} --`));
        this.subject.next(this.name);

        this._xmppClient.client.emit(`${data.from.bare}-joined`)
    };
}
