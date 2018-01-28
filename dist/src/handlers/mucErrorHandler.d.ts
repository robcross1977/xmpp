import Handler from './handler';
export default class MucErrorHandler extends Handler<string> {
    constructor();
    handler: (data: any) => void;
}
