import { Subject } from 'rxjs';
export default class Handler<T> {
    name: string;
    handler: Function | null;
    subject: Subject<T>;
    constructor();
}
