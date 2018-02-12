"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const logger_1 = require("../logger");
class MucErrorHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            logger_1.default.error({ error: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'muc:error';
    }
}
exports.default = MucErrorHandler;
//# sourceMappingURL=mucErrorHandler.js.map