import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';

export default class MucErrorHandler extends Handler<string> {
    constructor(logger: Logger) {
        super(logger);

        this.name = 'muc:error';
    }
 
    handler = (data: any): void => {
        this._logger.error({ error: data }, this.name);

        this.subject.next(this.name);
    };
}
