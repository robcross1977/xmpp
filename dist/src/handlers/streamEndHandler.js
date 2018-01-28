"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class StreamEndHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            console.info(colors.yellow('*'), colors.yellow(`-- ${this.name} --`));
            this.subject.next(this.name);
        };
        this.name = 'stream:end';
    }
}
exports.default = StreamEndHandler;
//# sourceMappingURL=streamEndHandler.js.map