"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
class StreamEndHandler extends handler_1.default {
    constructor(logger) {
        super(logger);
        this.handler = (data) => {
            this._logger.warn({ data: data }, this.name);
            this.subject.next(this.name);
        };
        this.name = 'stream:end';
    }
}
exports.default = StreamEndHandler;
//# sourceMappingURL=streamEndHandler.js.map