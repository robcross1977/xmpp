import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';

export default class StreamEndHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'stream:end';
    }

    handler = (data: any): void => {
        console.info(colors.yellow('*'), colors.yellow(`-- ${this.name} --`));
        this.subject.next(this.name);
    };
}
