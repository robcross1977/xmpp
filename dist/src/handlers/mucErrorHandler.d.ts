import Handler from './handler';
import Logger from '@murderbeard/logger';
export default class MucErrorHandler extends Handler<string> {
    constructor(logger: Logger);
    handler: (data: any) => void;
}
