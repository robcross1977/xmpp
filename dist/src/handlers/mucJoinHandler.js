"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
class MucJoinHandler extends handler_1.default {
    constructor(client, logger) {
        super(logger);
        this.handler = (data) => {
            this._logger.info({ data: data }, this.name);
            this.subject.next(this.name);
            this._xmppClient.client.emit(`${data.from.bare}-joined`);
        };
        this._xmppClient = client;
        this.name = 'muc:join';
    }
}
exports.default = MucJoinHandler;
//# sourceMappingURL=mucJoinHandler.js.map