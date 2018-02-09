import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';

export default class StreamEndHandler extends Handler<string> {
    constructor(logger: Logger) {
        super(logger);

        this.name = 'stream:end';
    }

    handler = (data: any): void => {
        this._logger.warn({ data: data}, this.name);
        
        this.subject.next(this.name);
    };
}
