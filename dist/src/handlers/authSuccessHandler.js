"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const logger_1 = require("../logger");
class ConnectedHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            logger_1.default.debug({ data: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'auth:success';
    }
}
exports.default = ConnectedHandler;
//# sourceMappingURL=authSuccessHandler.js.map