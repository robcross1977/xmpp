import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';


export default class StreamErrorHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'stream:error';
    }

    handler = (data: any): void => {
        console.info(colors.red('*'), colors.red(`-- ${this.name} --`));
        console.dir(data);

        this.subject.next(this.name);
    };
}
