import Handler from './handler';
export default class SessionErrorHandler extends Handler<string> {
    constructor();
    handler: (error: any) => void;
}
