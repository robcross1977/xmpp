import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';


export default class StreamErrorHandler extends Handler<string> {
    constructor(logger: Logger) {
        super(logger);

        this.name = 'stream:error';
    }

    handler = (data: any): void => {
        this._logger.error({ data: data }, this.name);

        this.subject.next(this.name);
    };
}
