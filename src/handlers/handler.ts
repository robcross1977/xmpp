import { Subject } from 'rxjs/Subject';
import Logger from '@murderbeard/logger';

export default class Handler<T> {
    public name: string;
    public handler: Function | null;
    public subject: Subject<T>;
    protected _logger: Logger;

    constructor(logger: Logger) {
        this._logger = logger;

        this.subject = new Subject<T>();
        this.name = 'handler';
        this.handler = null;
    }
}