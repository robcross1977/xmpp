"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
class StreamErrorHandler extends handler_1.default {
    constructor(logger) {
        super(logger);
        this.handler = (data) => {
            this._logger.error({ data: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'stream:error';
    }
}
exports.default = StreamErrorHandler;
//# sourceMappingURL=streamErrorHandler.js.map