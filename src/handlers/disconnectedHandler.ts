import Handler from './handler';
import logger from '../logger';

export default class DisonnectedHandler extends Handler<string> {
   constructor() {
        super();

        this.name = 'disconnected';
    }

    handler = (data: any): void => {
        logger.warn({ data: data }, this.name);
        
        this.subject.next(this.name);
    };
}
