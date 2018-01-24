import Client from './client';

export default class Xmpp {
    public client: Client;

    constructor() {
        this._setupClient();    
    }

    _setupClient() {
        this.client = new Client();
    }

    //_setupHandlers() {}
}