"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
class SessionErrorHandler extends handler_1.default {
    constructor(logger) {
        super(logger);
        this.handler = (error) => {
            this._logger.error({ error: error }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'session:error';
    }
}
exports.default = SessionErrorHandler;
//# sourceMappingURL=sessionErrorHandler.js.map