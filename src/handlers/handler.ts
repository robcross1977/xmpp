import { Subject } from 'rxjs/Subject';

export default class Handler<T> {
    public name: string = '';
    public handler: Function;
    public subject: Subject<T>;

    constructor() {
        this.subject = new Subject<T>();
    }
}