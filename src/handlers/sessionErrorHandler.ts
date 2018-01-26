import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';

export default class SessionErrorHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'session:error';
    }

    handler = (error: any): void => {
        console.error(colors.red('!'), colors.red(`-- ${this.name} --`));
        console.dir(error);

        this.subject.next(this.name);
    };
}
