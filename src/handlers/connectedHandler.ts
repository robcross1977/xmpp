import Handler from './handler';
import { Subject } from 'rxjs/Subject';
import * as colors from 'colors';

export default class ConnectedHandler extends Handler<string> {
    constructor() {
        super();

        this.name = 'connected';
    }

    handler = (connectedData: any): void => {
        console.log('#', `-- ${this.name} --`);
        this.subject.next('conntected');
    };
}