import Handler from './handler';
import logger from '../logger';

export default class StreamEndHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'stream:end';
    }

    handler = (data: any): void => {
        logger.warn({ data: data}, this.name);
        
        this.subject.next(this.name);
    };
}
