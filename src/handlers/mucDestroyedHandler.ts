import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';


export default class MucDestroyedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'muc:destroyed';
    }
 
    handler = (data: any): void => {
        console.info(colors.bgGreen('*'), colors.bgGreen(`-- ${this.name} --`));
        this.subject.next(this.name);
    };
}
