import Client from '../client';

export default class Muc {
    private _client: Client;

    constructor(client: Client) {
        this._client = client;
    }
}