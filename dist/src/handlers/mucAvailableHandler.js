"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
class MucAvailableHandler extends handler_1.default {
    constructor(logger) {
        super(logger);
        this.handler = (data) => {
            this._logger.info({ data: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'muc:available';
    }
}
exports.default = MucAvailableHandler;
//# sourceMappingURL=mucAvailableHandler.js.map