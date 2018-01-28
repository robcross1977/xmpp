import Handler from './handler';
export default class StreamErrorHandler extends Handler<string> {
    constructor();
    handler: (data: any) => void;
}
