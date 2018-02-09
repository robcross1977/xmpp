import Handler from './handler';
import Logger from '@murderbeard/logger';
export default class SessionErrorHandler extends Handler<string> {
    constructor(logger: Logger);
    handler: (error: any) => void;
}
