import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';

export default class DisonnectedHandler extends Handler<string> {
   constructor() {
        super();

        this.name = 'disconnected';
    }

    handler = (data: any): void => {
        console.info(colors.red('1'), colors.red(`-- ${this.name} --`));
        this.subject.next(this.name);
    };
}
