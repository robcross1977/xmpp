import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import logger from '../logger';

export default class SessionStartedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'session:started';
    }

    handler = (data: any): void => {
        logger.info({ data: data }, this.name);
        
        this.subject.next(this.name);
    };
}
