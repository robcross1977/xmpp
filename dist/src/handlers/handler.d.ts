import { Subject } from 'rxjs/Subject';
export default class Handler<T> {
    name: string;
    handler: Function;
    subject: Subject<T>;
    constructor();
}
