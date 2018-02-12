import Handler from './handler';
export default class DisonnectedHandler extends Handler<string> {
    constructor();
    handler: (data: any) => void;
}
