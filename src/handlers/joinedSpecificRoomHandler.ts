import Handler from './handler';
import logger from '../logger';

export default class JoinedSpecificRoomHandler extends Handler<string> {
    constructor(roomName: string) {
        super();

        this.name = `${roomName}-joined`;
    }
 
    handler = (data: any): void => {
        logger.info({ data: data }, this.name);
        this.subject.next(this.name);
        
        // We need to complete it so that it moves on to the next
        // piece. Also we are going to remove the handler since
        // it is a one-time only object. 
        this.subject.complete();
    };
}
