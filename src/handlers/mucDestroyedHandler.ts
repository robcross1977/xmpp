import Handler from './handler';
import logger from '../logger';

export default class MucDestroyedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'muc:destroyed';
    }
 
    handler = (data: any): void => {
        logger.info({data: data}, this.name);
        
        this.subject.next(this.name);
    };
}
