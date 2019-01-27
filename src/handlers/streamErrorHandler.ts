import Handler from './handler';
import logger from '../logger';


export default class StreamErrorHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'stream:error';
    }

    handler = (data: any): void => {
        logger.error({ data: data }, this.name);

        this.subject.next(this.name);
    };
}
