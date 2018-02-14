"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const logger_1 = require("../logger");
class MucJoinHandler extends handler_1.default {
    constructor(client) {
        super();
        this.handler = (data) => {
            logger_1.default.info({ data: data }, this.name);
            this.subject.next(this.name);
            // when we join a specific room we want to be able to have event data about it while it exists
            this._xmppClient.client.emit(`${data.from.bare}-joined`);
        };
        this._xmppClient = client;
        this.name = 'muc:join';
    }
}
exports.default = MucJoinHandler;
//# sourceMappingURL=mucJoinHandler.js.map