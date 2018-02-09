"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
class MucLeaveHandler extends handler_1.default {
    constructor(logger) {
        super(logger);
        this.handler = (data) => {
            this._logger.info({ data: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'muc:leave';
    }
}
exports.default = MucLeaveHandler;
//# sourceMappingURL=mucLeaveHandler.js.map