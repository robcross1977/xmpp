import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import logger from '../logger';

export default class ConnectedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'auth:failed';
    }

    handler = (data: any): void => {
        logger.error({error: data}, this.name);
        
        this.subject.next(this.name);
    };
}
