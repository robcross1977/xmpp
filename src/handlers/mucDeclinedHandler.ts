import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';

export default class MucAvailableHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'muc:declined';
    }
 
    handler = (data: any): void => {
        console.info(colors.red('!'), colors.red(`-- ${this.name} --`));
        this.subject.next(this.name);
    };
}
