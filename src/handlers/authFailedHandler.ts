import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';

export default class ConnectedHandler extends Handler<string> {
    constructor(logger: Logger) {
        super(logger);

        this.name = 'auth:failed';
    }

    handler = (data: any): void => {
        this._logger.error({error: data}, this.name);
        
        this.subject.next(this.name);
    };
}
