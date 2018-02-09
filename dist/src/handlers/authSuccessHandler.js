"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
class ConnectedHandler extends handler_1.default {
    constructor(logger) {
        super(logger);
        this.handler = (data) => {
            this._logger.debug({ data: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'auth:success';
    }
}
exports.default = ConnectedHandler;
//# sourceMappingURL=authSuccessHandler.js.map