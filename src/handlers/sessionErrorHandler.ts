import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';

export default class SessionErrorHandler extends Handler<string> {
    constructor(logger: Logger) {
        super(logger);

        this.name = 'session:error';
    }

    handler = (error: any): void => {
        this._logger.error({ error: error }, this.name);
        
        this.subject.next(this.name);
    };
}
