"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class SessionErrorHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (error) => {
            console.error(colors.red('!'), colors.red(`-- ${this.name} --`));
            console.dir(error);
            this.subject.next(this.name);
        };
        this.name = 'session:error';
    }
}
exports.default = SessionErrorHandler;
//# sourceMappingURL=sessionErrorHandler.js.map