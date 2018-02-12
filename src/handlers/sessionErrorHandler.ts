import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import logger from '../logger';

export default class SessionErrorHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'session:error';
    }

    handler = (error: any): void => {
        logger.error({ error: error }, this.name);
        
        this.subject.next(this.name);
    };
}
