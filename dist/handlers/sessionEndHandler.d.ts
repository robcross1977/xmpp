import Handler from './handler';
export default class SessionStartedHandler extends Handler<string> {
    constructor();
    handler: (data: any) => void;
}
