import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';

export default class ConnectedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'auth:failed';
    }

    handler = (data: any): void => {
        console.error(colors.red('!'), colors.red(`-- ${this.name} --`));
        this.subject.next('auth:failed');
    };
}
