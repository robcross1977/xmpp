"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const logger_1 = require("../logger");
class SessionErrorHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (error) => {
            logger_1.default.error({ error: error }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'session:error';
    }
}
exports.default = SessionErrorHandler;
//# sourceMappingURL=sessionErrorHandler.js.map