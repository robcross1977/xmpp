"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class DisonnectedHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            console.info(colors.red('!'), colors.red(`-- ${this.name} --`));
            this.subject.next(this.name);
        };
        this.name = 'disconnected';
    }
}
exports.default = DisonnectedHandler;
//# sourceMappingURL=disconnectedHandler.js.map