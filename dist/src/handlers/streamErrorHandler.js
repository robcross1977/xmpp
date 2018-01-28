"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class StreamErrorHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            console.info(colors.red('*'), colors.red(`-- ${this.name} --`));
            console.dir(data);
            this.subject.next(this.name);
        };
        this.name = 'stream:error';
    }
}
exports.default = StreamErrorHandler;
//# sourceMappingURL=streamErrorHandler.js.map