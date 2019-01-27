import Handler from './handler';
import logger from '../logger';

export default class ConnectedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'connected';
    }

    handler = (data: any): void => {
        logger.debug({ data: data }, this.name);
        
        this.subject.next(this.name);
    };
}