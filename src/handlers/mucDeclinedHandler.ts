import Handler from './handler';
import logger from '../logger';

export default class MucAvailableHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'muc:declined';
    }
 
    handler = (data: any): void => {
        logger.info({ data: data}, this.name);

        this.subject.next(this.name);
    };
}
