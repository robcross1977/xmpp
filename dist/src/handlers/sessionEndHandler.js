"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const logger_1 = require("../logger");
class SessionStartedHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            logger_1.default.info({ data: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'session:end';
    }
}
exports.default = SessionStartedHandler;
//# sourceMappingURL=sessionEndHandler.js.map