import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';


export default class SessionStartedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'session:started';
    }

    handler = (data: any): void => {
        console.info(colors.green('#'), colors.green(`-- ${this.name} --`));
        this.subject.next('session:started');
    };
}
