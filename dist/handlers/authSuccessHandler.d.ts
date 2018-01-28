import Handler from './handler';
export default class ConnectedHandler extends Handler<string> {
    constructor();
    handler: (data: any) => void;
}
