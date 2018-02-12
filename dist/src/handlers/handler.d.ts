import { Subject } from 'rxjs/Subject';
export default class Handler<T> {
    name: string;
    handler: Function | null;
    subject: Subject<T>;
    constructor();
}
