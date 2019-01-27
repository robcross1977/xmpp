import Handler from './handler';
import logger from '../logger';

export default class MucErrorHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'muc:error';
    }
 
    handler = (data: any): void => {
        logger.error({ error: data }, this.name);

        this.subject.next(this.name);
    };
}
