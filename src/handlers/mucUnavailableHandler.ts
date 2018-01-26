import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';

export default class MucUnavailableHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'muc:unavailable';
    }
 
    handler = (data: any): void => {
        console.info(colors.green('#'), colors.green(`-- ${this.name} --`));
        this.subject.next(this.name);
    };
} 
