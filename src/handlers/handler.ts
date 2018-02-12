import { Subject } from 'rxjs/Subject';

export default class Handler<T> {
    public name: string;
    public handler: Function | null;
    public subject: Subject<T>;

    constructor() {
        this.subject = new Subject<T>();
        this.name = 'handler';
        this.handler = null;
    }
}