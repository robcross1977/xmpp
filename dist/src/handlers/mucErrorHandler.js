"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
class MucErrorHandler extends handler_1.default {
    constructor(logger) {
        super(logger);
        this.handler = (data) => {
            this._logger.error({ error: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'muc:error';
    }
}
exports.default = MucErrorHandler;
//# sourceMappingURL=mucErrorHandler.js.map