import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';
export default class Handler<T> {
    name: string;
    handler: Function | null;
    subject: Subject<T>;
    protected _logger: Logger;
    constructor(logger: Logger);
}
