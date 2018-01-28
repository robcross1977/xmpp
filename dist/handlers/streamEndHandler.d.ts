import Handler from './handler';
export default class StreamEndHandler extends Handler<string> {
    constructor();
    handler: (data: any) => void;
}
