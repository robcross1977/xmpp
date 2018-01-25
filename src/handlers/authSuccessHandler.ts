import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';

export default class ConnectedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'auth:success';
    }

    handler = (data: any): void => {
        console.error(colors.green('#'), colors.green(`-- ${this.name} --`));
        this.subject.next(this.name);
    };
}
