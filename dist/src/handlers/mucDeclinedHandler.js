"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class MucAvailableHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            console.info(colors.red('!'), colors.red(`-- ${this.name} --`));
            console.dir(data);
            this.subject.next(this.name);
        };
        this.name = 'muc:declined';
    }
}
exports.default = MucAvailableHandler;
//# sourceMappingURL=mucDeclinedHandler.js.map