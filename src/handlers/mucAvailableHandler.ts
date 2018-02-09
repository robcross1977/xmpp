import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';

export default class MucAvailableHandler extends Handler<string> {
    constructor(logger: Logger) {
        super(logger);

        this.name = 'muc:available';
    }

    handler = (data: any): void => {
        this._logger.info({ data: data }, this.name);
        
        this.subject.next(this.name);
    };
}
